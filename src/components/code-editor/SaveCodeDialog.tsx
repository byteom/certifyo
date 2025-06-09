import { useState } from 'react';
import { X, Save, Tag, Globe, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { saveCodeSnippet } from '@/services/code-snippets';

interface SaveCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  onSaveSuccess?: (snippetId: string) => void;
}

export default function SaveCodeDialog({
  isOpen,
  onClose,
  code,
  language,
  onSaveSuccess
}: SaveCodeDialogProps) {
  const { user: currentUser } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError("You must be logged in to save code snippets");
      return;
    }
    
    if (!title.trim()) {
      setError("Please enter a title for your snippet");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const snippet = await saveCodeSnippet(
        currentUser.id, 
        title,
        description,
        code,
        language,
        tags,
        isPublic
      );
      
      if (onSaveSuccess) {
        onSaveSuccess(snippet.id);
      }
      
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save snippet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddTag = () => {
    const trimmedTag = currentTag.trim().toLowerCase();
    if (!trimmedTag) return;
    
    if (!tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setCurrentTag('');
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-lg border border-purple-900/40 max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Save className="w-5 h-5 text-purple-400" />
            Save Code Snippet
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your code snippet a title"
                className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a brief description (optional)"
                rows={3}
                className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tags
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add tags (press Enter)"
                    className="w-full p-2.5 pl-9 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700"
                >
                  Add
                </button>
              </div>
              
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <div 
                      key={tag}
                      className="bg-purple-900/30 border border-purple-800/50 rounded-full px-2.5 py-1 flex items-center gap-1 text-xs"
                    >
                      <span>{tag}</span>
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-white rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded bg-gray-800 border-gray-700 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="isPublic" className="flex items-center gap-1.5 text-sm text-gray-300">
                {isPublic ? (
                  <>
                    <Globe className="w-4 h-4 text-green-400" />
                    Public (visible to everyone)
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gray-400" />
                    Private (only visible to you)
                  </>
                )}
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 flex items-center gap-2 bg-purple-600 text-white rounded-lg ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Snippet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 