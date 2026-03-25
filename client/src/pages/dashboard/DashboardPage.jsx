import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRootFolderModal from "../../components/dashboard/CreateRootFolderModal";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";
import SlateFolderCard from "../../components/dashboard/SlateFolderCard";
import useFileStore from "../../store/useFileStore";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { addItem, deleteItem, fileSystem, renameItem } = useFileStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const rootFolders = fileSystem.filter((item) => item.type === "folder");
  const visibleFolders = rootFolders.filter((folder) => {
    const matchesSearch = folder.name
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filterValue === "with-items") {
      return (folder.children || []).length > 0;
    }

    if (filterValue === "empty") {
      return (folder.children || []).length === 0;
    }

    return true;
  });

  const handleCreateFolder = async (event) => {
    event.preventDefault();
    if (!newFolderName.trim()) {
      return;
    }

    try {
      await addItem(null, newFolderName, "folder");
      setIsCreateModalOpen(false);
      setNewFolderName("");
    } catch (error) {
      console.error("Failed to create folder", error);
    }
  };

  const handleRenameFolder = async (folder, nextName) => {
    const name = nextName?.trim();
    if (!name || name === folder.name) {
      return;
    }

    try {
      await renameItem(folder.id, name);
    } catch (error) {
      console.error("Failed to rename folder", error);
    }
  };

  const handleDeleteFolder = async (folder) => {
    if (!window.confirm(`Delete folder "${folder.name}" and its contents?`)) {
      return;
    }

    try {
      await deleteItem(folder.id);
    } catch (error) {
      console.error("Failed to delete folder", error);
    }
  };

  return (
    <div className="relative h-full overflow-y-auto p-8">
      <CreateRootFolderModal
        isOpen={isCreateModalOpen}
        value={newFolderName}
        onChange={setNewFolderName}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateFolder}
      />

      <DashboardTopBar
        searchValue={searchValue}
        filterValue={filterValue}
        onSearchChange={setSearchValue}
        onFilterChange={setFilterValue}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visibleFolders.map((folder) => (
          <SlateFolderCard
            key={folder.id}
            folder={{
              ...folder,
              files: (folder.children || []).length,
              created: folder.createdAt || Date.now(),
            }}
            onOpen={() => navigate(`/folder/${folder.id}`)}
            onRename={(_folderId, nextName) => handleRenameFolder(folder, nextName)}
            onDelete={() => handleDeleteFolder(folder)}
          />
        ))}

        <div
          onClick={() => setIsCreateModalOpen(true)}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 p-6 text-gray-500 transition-colors hover:border-gray-600 hover:text-gray-300"
        >
          <span className="mb-2 text-4xl">+</span>
          <span className="font-medium">New Folder</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
