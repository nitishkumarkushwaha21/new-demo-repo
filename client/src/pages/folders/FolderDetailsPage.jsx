import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderHeader from "../../components/folders/FolderHeader";
import FolderItemsTable from "../../components/folders/FolderItemsTable";
import useFileStore from "../../store/useFileStore";
import { findTreeNode } from "../../utils/fileTree";

const extractProblemNameFromLink = (link) => {
  if (!link) {
    return "";
  }

  const match = link.match(/leetcode\.com\/problems\/([^/]+)\/description/i);
  if (!match?.[1]) {
    return "";
  }

  return match[1]
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const FolderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, deleteItem, fileSystem } = useFileStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [folderInput, setFolderInput] = useState("");
  const [problemInput, setProblemInput] = useState("");
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const currentFolder = findTreeNode(fileSystem, id);

  if (!currentFolder) {
    return <div className="p-8 text-white">Folder not found</div>;
  }

  const filteredChildren =
    currentFolder.children?.filter((child) => {
      const matchesSearch = child.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      if (child.type !== "file") {
        return activeFilter === "all";
      }

      if (activeFilter === "unsolved") {
        return !child.isSolved;
      }

      if (activeFilter === "unrevised") {
        return !child.isRevised;
      }

      if (activeFilter === "important") {
        return child.isImportant;
      }

      return true;
    }) || [];

  const handleCreateFolder = async () => {
    const folderName = folderInput.trim();
    if (!folderName) {
      return;
    }

    try {
      await addItem(currentFolder.id, folderName, "folder");
      setFolderInput("");
    } catch (error) {
      console.error("Failed to create folder", error);
    }
  };

  const handleCreateProblem = async () => {
    const trimmedLink = problemInput.trim();
    const problemName = extractProblemNameFromLink(trimmedLink);

    if (!trimmedLink || !problemName) {
      window.alert("Paste a valid LeetCode problem link.");
      return;
    }

    try {
      const created = await addItem(currentFolder.id, problemName, "file", trimmedLink);
      setProblemInput("");

      if (created?.id) {
        navigate(`/problem/${created.id}`);
      }
    } catch (error) {
      console.error("Failed to create problem", error);
    }
  };

  const handleResetRevisions = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset all revision status in this folder?",
      )
    ) {
      return;
    }

    for (const child of currentFolder.children || []) {
      if (child.type === "file" && child.isRevised) {
        await useFileStore.getState().toggleFileRevision(child.id);
      }
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-neutral-900 text-gray-200">
      <FolderHeader
        folderName={currentFolder.name}
        itemCount={filteredChildren.length}
        searchTerm={searchTerm}
        folderInput={folderInput}
        problemInput={problemInput}
        activeFilter={activeFilter}
        onBack={() => navigate(-1)}
        onResetRevisions={handleResetRevisions}
        onSearchChange={setSearchTerm}
        onFolderInputKeyDown={(event) => {
          if (event.key === "Enter") {
            handleCreateFolder();
          }
        }}
        onProblemInputKeyDown={(event) => {
          if (event.key === "Enter") {
            handleCreateProblem();
          }
        }}
        onFolderInputChange={setFolderInput}
        onProblemInputChange={setProblemInput}
        onCreateFolder={handleCreateFolder}
        onCreateProblem={handleCreateProblem}
        onFilterChange={setActiveFilter}
      />

      <div className="flex-1 overflow-auto p-6">
        <FolderItemsTable
          items={filteredChildren}
          renamingId={renamingId}
          renameValue={renameValue}
          onNavigate={(item) =>
            navigate(item.type === "folder" ? `/folder/${item.id}` : `/problem/${item.id}`)
          }
          onRenameStart={(event, item) => {
            event.stopPropagation();
            setRenamingId(item.id);
            setRenameValue(item.name);
          }}
          onRenameChange={setRenameValue}
          onRenameKeyDown={async (event) => {
            if (event.key === "Enter") {
              event.stopPropagation();
              if (renamingId && renameValue.trim()) {
                try {
                  await useFileStore
                    .getState()
                    .renameItem(renamingId, renameValue);
                } catch (error) {
                  console.error("Rename failed", error);
                }
              }
              setRenamingId(null);
            } else if (event.key === "Escape") {
              setRenamingId(null);
            }
          }}
          onRenameBlur={() => setRenamingId(null)}
          onToggleRevision={async (event, item) => {
            event.stopPropagation();
            await useFileStore.getState().toggleFileRevision(item.id);
          }}
          onToggleSolved={async (event, item) => {
            event.stopPropagation();
            await useFileStore.getState().toggleFileSolved(item.id);
          }}
          onToggleImportant={async (event, item) => {
            event.stopPropagation();
            await useFileStore.getState().toggleFileImportant(item.id);
          }}
          onOpenLink={(event, item) => {
            event.stopPropagation();
            if (item.link) {
              window.open(item.link, "_blank", "noopener,noreferrer");
            }
          }}
          onDelete={(event, itemId) => {
            event.stopPropagation();
            deleteItem(itemId);
          }}
        />
      </div>
    </div>
  );
};

export default FolderDetailsPage;
