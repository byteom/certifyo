"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BlogPost } from "@/types";
import { useThemeStore } from "@/store/themeStore";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlog: (blog: {
    title: string;
    description: string;
    slug: string;
    category: string;
    content: string;
  }) => void;
  initialData?: BlogPost;
  isEditMode?: boolean;
}
const categories = ["Technology", "Travel", "Food", "Others"];
export default function AddBlogModal({
  isOpen,
  onClose,
  onAddBlog,
  initialData,
  isEditMode = false,
}: AddBlogModalProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(
    initialData?.category || categories[0]
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);
      setSlug(generatedSlug);
    }
  }, [title]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      onAddBlog({
        title,
        description,
        slug,
        category,
        content,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error adding blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-900";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const inputBg = isDarkMode ? "bg-gray-700" : "bg-white";
  const errorBorder = "border-red-500";
  const buttonHover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-40 backdrop-blur-sm  transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center  pointer-events-none">
        <div
          className={`${modalBg} ${textColor} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto border-2 ${borderColor} transform transition-all duration-300 ease-in-out scale-95 opacity-0`}
          style={{ animation: "fadeIn 0.3s ease-in-out forwards" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`flex justify-between items-center p-4 border-b ${borderColor} sticky top-0 ${modalBg} z-10`}
          >
            <h2 className="text-xl font-semibold">
              {isEditMode ? "Edit Blog " : "Add New Blog "}
            </h2>
            <button
              onClick={() => {
                setErrors({});
                onClose();
              }}
              className={`p-1 rounded-full ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <X
                size={20}
                className={
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-900"
                    : "text-gray-500 hover:bg-gray-100"
                }
              />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label
                htmlFor="title"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Title <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? errorBorder : borderColor
                } ${inputBg} ${textColor}`}
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description <span className="text-red-500 text-lg">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? errorBorder : borderColor
                } ${inputBg} ${textColor}`}
                placeholder="Enter short description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category <span className="text-red-500 text-lg">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.category ? errorBorder : borderColor
                  } ${inputBg} ${textColor}`}
                >
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Content <span className="text-red-500 text-lg">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.content ? errorBorder : borderColor
                } ${inputBg} ${textColor}`}
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  onClose();
                }}
                className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode
                    ? "focus:ring-offset-gray-800"
                    : "focus:ring-offset-white"
                }`}
              >
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update Post"
                  : "Add Post"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
