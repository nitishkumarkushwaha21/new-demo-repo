import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Group as PanelGroup,
  Panel,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import { Loader2 } from "lucide-react";
import CodeEditor from "../../components/editor/CodeEditor";
import ProblemComplexityFields from "../../components/problem/ProblemComplexityFields";
import ProblemMetadataPanel from "../../components/problem/ProblemMetadataPanel";
import ProblemSolutionTabs from "../../components/problem/ProblemSolutionTabs";
import { fileService } from "../../services/api";
import useFileStore from "../../store/useFileStore";
import { findTreeNode } from "../../utils/fileTree";

const findParentFolder = (nodes, targetId, parent = null) => {
  for (const node of nodes) {
    if (String(node.id) === String(targetId)) {
      return parent;
    }

    if (node.children?.length) {
      const foundParent = findParentFolder(node.children, targetId, node);
      if (foundParent) {
        return foundParent;
      }
    }
  }

  return null;
};

const buildImportedProblemState = (problemData) => ({
  title: problemData.title,
  slug: problemData.slug,
  difficulty: problemData.difficulty,
  description: problemData.description || problemData.descriptionText || "",
  tags: problemData.tags || [],
  exampleTestcases: problemData.exampleTestcases || "",
  codeSnippets: problemData.codeSnippets || [],
});

const ProblemEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    activeFileId,
    fileSystem,
    setActiveFile,
    updateFileAnalysis,
    updateFileContent,
    updateSolutionEntries,
  } = useFileStore();
  const { fileSystem: allFiles, isLoading } = useFileStore();
  const [activeTab, setActiveTab] = useState("optimal");
  const [isImporting, setIsImporting] = useState(false);
  const [problemRecord, setProblemRecord] = useState(null);

  const activeFile = id ? findTreeNode(fileSystem, id) : null;
  const [localLink, setLocalLink] = useState(activeFile?.link || "");

  const problemView = activeFile
    ? {
        ...activeFile,
        ...problemRecord,
        title: problemRecord?.title ?? activeFile.title,
        slug: problemRecord?.slug ?? activeFile.slug,
        difficulty: problemRecord?.difficulty ?? activeFile.difficulty,
        description: problemRecord?.description ?? activeFile.description,
        exampleTestcases:
          problemRecord?.exampleTestcases ?? activeFile.exampleTestcases,
        codeSnippets: problemRecord?.codeSnippets ?? activeFile.codeSnippets,
        tags: problemRecord?.tags ?? activeFile.tags,
        notes: problemRecord?.notes ?? activeFile.notes,
        solutionEntries:
          problemRecord?.solutionEntries ??
          activeFile.solutionEntries ?? [
            { id: "optimal", label: "Optimal", code: "" },
          ],
        solutions: problemRecord?.solutions ?? activeFile.solutions,
        analysis: problemRecord?.analysis ?? activeFile.analysis,
      }
    : null;

  const solutionEntries = problemView?.solutionEntries?.length
    ? problemView.solutionEntries
    : [{ id: "optimal", label: "Optimal", code: "" }];
  const parentFolder = id ? findParentFolder(fileSystem, id) : null;
  const siblingProblems = (parentFolder?.children || [])
    .filter((item) => item.type === "file")
    .sort((left, right) => String(left.id).localeCompare(String(right.id), undefined, { numeric: true }));
  const currentProblemIndex = siblingProblems.findIndex(
    (item) => String(item.id) === String(id),
  );
  const nextProblem =
    currentProblemIndex >= 0 ? siblingProblems[currentProblemIndex + 1] : null;

  useEffect(() => {
    if (activeFile && activeFile.link !== localLink && !isImporting) {
      setLocalLink(activeFile.link || "");
    }
  }, [activeFile, isImporting, localLink]);

  useEffect(() => {
    if (!solutionEntries.some((entry) => entry.id === activeTab)) {
      setActiveTab(solutionEntries[0]?.id || "optimal");
    }
  }, [activeTab, solutionEntries]);

  useEffect(() => {
    if (id && (!activeFileId || String(activeFileId) !== String(id))) {
      setActiveFile(id);
      useFileStore.getState().clearExpandedFolders();
    }
  }, [activeFileId, id, setActiveFile]);

  useEffect(() => {
    if (!id) {
      setProblemRecord(null);
      return undefined;
    }

    let isCancelled = false;

    const loadProblemRecord = async () => {
      try {
        const { data } = await fileService.getProblem(id);
        if (!isCancelled) {
          setProblemRecord(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load problem record", error);
        }
      }
    };

    loadProblemRecord();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (isLoading || (allFiles.length === 0 && id)) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-neutral-900 text-gray-500">
        <Loader2 className="mb-4 animate-spin" size={32} />
        Loading workspace...
      </div>
    );
  }

  if (!activeFile) {
    return (
      <div className="flex h-full items-center justify-center bg-neutral-900 text-gray-500">
        Problem not found.
      </div>
    );
  }

  const handleTimeChange = (event) => {
    setProblemRecord((current) => ({
      ...(current || {}),
      analysis: {
        time: event.target.value,
        space: problemView?.analysis?.space || "",
        explanation: problemView?.analysis?.explanation || "",
      },
    }));
    updateFileAnalysis(activeFileId, {
      time: event.target.value,
      space: problemView?.analysis?.space || "",
      explanation: problemView?.analysis?.explanation || "",
    });
  };

  const handleSpaceChange = (event) => {
    setProblemRecord((current) => ({
      ...(current || {}),
      analysis: {
        time: problemView?.analysis?.time || "",
        space: event.target.value,
        explanation: problemView?.analysis?.explanation || "",
      },
    }));
    updateFileAnalysis(activeFileId, {
      time: problemView?.analysis?.time || "",
      space: event.target.value,
      explanation: problemView?.analysis?.explanation || "",
    });
  };

  const handleLinkBlur = async (event) => {
    const newLink = event.target.value.trim();

    if (newLink !== activeFile.link) {
      await useFileStore.getState().updateFileLink(activeFile.id, newLink);
    }
  };

  const handleImportQuestion = async () => {
    const sourceLink = localLink.trim();

    if (!sourceLink || !sourceLink.includes("leetcode.com/problems/")) {
      window.alert("Paste a valid LeetCode problem link first.");
      return;
    }

    setIsImporting(true);
    try {
      if (sourceLink !== activeFile.link) {
        await useFileStore.getState().updateFileLink(activeFile.id, sourceLink);
      }

      const { data: problemData } = await fileService.importProblem(sourceLink);
      const resolvedDescription =
        problemData.description || problemData.descriptionText || "";

      try {
        await fileService.createProblem(activeFile.id);
      } catch (_error) {
        console.log("Problem entry might already exist");
      }

      await fileService.updateProblem(activeFile.id, {
        title: problemData.title,
        slug: problemData.slug,
        difficulty: problemData.difficulty,
        description: resolvedDescription,
        exampleTestcases: problemData.exampleTestcases,
        codeSnippets: problemData.codeSnippets,
        tags: problemData.tags,
      });

      setProblemRecord((current) => ({
        ...current,
        ...buildImportedProblemState({
          ...problemData,
          description: resolvedDescription,
        }),
      }));
      useFileStore.getState().mergeProblemDetails(activeFile.id, {
        title: problemData.title,
        slug: problemData.slug,
        difficulty: problemData.difficulty,
        description: resolvedDescription,
        exampleTestcases: problemData.exampleTestcases,
        codeSnippets: problemData.codeSnippets,
        tags: problemData.tags,
      });

      await useFileStore.getState().renameItem(activeFile.id, problemData.title);
      await useFileStore.getState().setActiveFile(activeFile.id);
    } catch (error) {
      console.error("Failed to import problem:", error);
      window.alert(
        `Failed to import problem: ${error.message || "Unknown error"}`,
      );
    } finally {
      setIsImporting(false);
    }
  };

  const persistSolutionEntries = async (nextEntries) => {
    setProblemRecord((current) => ({
      ...(current || {}),
      solutionEntries: nextEntries,
    }));
    await updateSolutionEntries(activeFile.id, nextEntries);
  };

  const handleAddSolution = async () => {
    const nextEntries = [
      ...solutionEntries,
      {
        id: `solution-${Date.now()}`,
        label: `Solution ${solutionEntries.length + 1}`,
        code: "",
      },
    ];
    await persistSolutionEntries(nextEntries);
    setActiveTab(nextEntries[nextEntries.length - 1].id);
  };

  const handleRenameSolution = async (solutionId, nextLabel) => {
    const nextEntries = solutionEntries.map((entry) =>
      entry.id === solutionId ? { ...entry, label: nextLabel } : entry,
    );
    await persistSolutionEntries(nextEntries);
  };

  const handleDeleteSolution = async (solutionId) => {
    if (solutionEntries.length === 1) {
      return;
    }

    const nextEntries = solutionEntries.filter((entry) => entry.id !== solutionId);
    await persistSolutionEntries(nextEntries);

    if (activeTab === solutionId) {
      setActiveTab(nextEntries[0].id);
    }
  };

  const handleMoveSolution = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= solutionEntries.length) {
      return;
    }

    const nextEntries = [...solutionEntries];
    const [moved] = nextEntries.splice(fromIndex, 1);
    nextEntries.splice(toIndex, 0, moved);
    await persistSolutionEntries(nextEntries);
  };

  const handleNextProblem = async () => {
    if (!nextProblem) {
      return;
    }

    await setActiveFile(nextProblem.id);
    navigate(`/problem/${nextProblem.id}`);
  };

  return (
    <PanelGroup direction="horizontal" className="group h-full">
      <Panel
        defaultSize={40}
        minSize={20}
        className="border-r border-neutral-800 bg-neutral-900"
      >
        <ProblemMetadataPanel
          activeFile={problemView}
          isImporting={isImporting}
          localLink={localLink}
          onLinkChange={setLocalLink}
          onLinkBlur={handleLinkBlur}
          onImportClick={handleImportQuestion}
        />
      </Panel>

      <PanelResizeHandle className="w-1 bg-neutral-800 transition-colors group-hover:bg-blue-600" />

      <Panel defaultSize={60} minSize={20} className="bg-neutral-900">
        <div className="flex h-full flex-col">
          <ProblemSolutionTabs
            activeTab={activeTab}
            solutions={solutionEntries}
            onAdd={handleAddSolution}
            onChange={setActiveTab}
            onDelete={handleDeleteSolution}
            onMoveLeft={(index) => handleMoveSolution(index, index - 1)}
            onMoveRight={(index) => handleMoveSolution(index, index + 1)}
            onRename={handleRenameSolution}
          />

          <div className="min-h-0 flex-1">
            <CodeEditor
              code={
                solutionEntries.find((entry) => entry.id === activeTab)?.code || ""
              }
              language="javascript"
              onChange={(newCode) => {
                const nextEntries = solutionEntries.map((entry) =>
                  entry.id === activeTab ? { ...entry, code: newCode } : entry,
                );
                setProblemRecord((current) => ({
                  ...(current || {}),
                  solutionEntries: nextEntries,
                }));
                updateFileContent(activeFileId, activeTab, newCode);
              }}
            />
          </div>

          <ProblemComplexityFields
            timeValue={problemView?.analysis?.time}
            spaceValue={problemView?.analysis?.space}
            onTimeChange={handleTimeChange}
            onSpaceChange={handleSpaceChange}
            onNext={handleNextProblem}
            hasNext={Boolean(nextProblem)}
          />
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default ProblemEditorPage;
