import React, { useState } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const { statues, addStatue, removeStatue } = usePhotos();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'gallery'
  const [preview, setPreview] = useState(null);
  const [statueName, setStatueName] = useState('');
  const [statueMaterial, setStatueMaterial] = useState('');
  const [statueDescription, setStatueDescription] = useState('');
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'scmsacv@474') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-brand-sand font-sans flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background elegant gradient elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-sand/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-[#1A1A17] border border-brand-bronze/20 p-8 md:p-12 relative z-10 shadow-2xl">
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-2xl font-serif font-light text-white tracking-widest uppercase">Admin Access</h1>
            <div className="h-[1px] w-12 bg-brand-bronze/50 mx-auto" />
            <p className="text-[10px] text-brand-grey uppercase tracking-[0.2em]">Enter password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-b border-brand-charcoal/50 focus:border-brand-bronze text-white p-3 focus:outline-none transition-colors text-center tracking-[0.2em]"
                autoFocus
              />
              {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-bronze text-white uppercase text-[10px] tracking-[0.2em] py-4 hover:bg-white hover:text-black transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-[10px] text-brand-grey uppercase tracking-[0.1em] hover:text-brand-bronze transition-colors">
              &larr; Return to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview && statueName && statueDescription && statueMaterial) {
      addStatue({
        statueName: statueName,
        material: statueMaterial,
        description: statueDescription,
        image: preview
      });
      setPreview(null);
      setStatueName('');
      setStatueMaterial('');
      setStatueDescription('');
      alert('Statue added successfully to the gallery!');
      setActiveTab('gallery');
    } else {
      alert('Please provide a photo, a name, a material, and a description.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-brand-sand font-sans p-8 md:p-16">
      
      {/* Admin Header */}
      <div className="flex justify-between items-end border-b border-brand-bronze/20 pb-8 mb-12">
        <div>
          <h1 className="text-3xl font-serif font-light text-white tracking-wider">Atelier Dashboard</h1>
          <p className="text-xs text-brand-grey uppercase tracking-[0.2em] mt-2">Gallery Content Management</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={handleLogout}
            className="text-[10px] text-brand-grey uppercase tracking-[0.1em] hover:text-white transition-colors border border-transparent px-4 py-2"
          >
            Logout
          </button>
          <a href="/" className="text-[10px] text-brand-bronze uppercase tracking-[0.1em] hover:text-white transition-colors border border-brand-bronze/30 px-6 py-2 flex items-center">
            Return to Website
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 mb-12 border-b border-brand-charcoal">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative ${activeTab === 'upload' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Add New Statue
          {activeTab === 'upload' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative ${activeTab === 'gallery' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Manage Gallery
          {activeTab === 'gallery' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Name of the Statue</label>
              <input 
                type="text"
                value={statueName}
                onChange={(e) => setStatueName(e.target.value)}
                placeholder="e.g. Vinayaka in Makrana Marble"
                className="w-full bg-[#1A1A17] border border-brand-bronze/20 text-white p-4 focus:outline-none focus:border-brand-bronze"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Material</label>
              <input 
                type="text"
                value={statueMaterial}
                onChange={(e) => setStatueMaterial(e.target.value)}
                placeholder="e.g. Makrana Marble"
                className="w-full bg-[#1A1A17] border border-brand-bronze/20 text-white p-4 focus:outline-none focus:border-brand-bronze"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Description</label>
              <textarea 
                value={statueDescription}
                onChange={(e) => setStatueDescription(e.target.value)}
                placeholder="Enter a beautifully detailed description of the statue..."
                className="w-full bg-[#1A1A17] border border-brand-bronze/20 text-white p-4 focus:outline-none focus:border-brand-bronze min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Upload Statue Photo</label>
              <div className="border-2 border-dashed border-brand-bronze/20 hover:border-brand-bronze/50 transition-colors bg-[#1A1A17] p-12 flex flex-col items-center justify-center text-center cursor-pointer relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-brand-bronze mb-4 opacity-50" />
                <span className="text-sm text-white">Click or drag image to upload</span>
                <span className="text-[10px] text-brand-grey mt-2">JPG, PNG up to 5MB</span>
              </div>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={!preview || !statueName || !statueDescription || !statueMaterial}
              className="w-full bg-brand-bronze text-white uppercase text-xs tracking-[0.2em] py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Add to Gallery</span>
              <Check className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
             <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Photo Preview</label>
             <div className="bg-[#1A1A17] border border-brand-bronze/20 h-[500px] flex items-center justify-center p-4">
               {preview ? (
                 <img src={preview} alt="Upload preview" className="max-w-full max-h-full object-contain shadow-2xl" />
               ) : (
                 <div className="flex flex-col items-center opacity-30">
                    <ImageIcon className="w-12 h-12 mb-4" />
                    <span className="text-sm font-light">No photo selected</span>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {statues.length === 0 ? (
            <div className="col-span-full py-20 text-center text-brand-grey italic font-light">
              No statues have been added to the custom gallery yet.
            </div>
          ) : (
            statues.map(statue => (
              <div key={statue.id} className="bg-[#1A1A17] border border-brand-bronze/10 p-4 space-y-4 group">
                <div className="h-48 bg-black/50 border border-brand-bronze/5 flex items-center justify-center relative overflow-hidden">
                  <img src={statue.image} alt={statue.statueName} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <button 
                    onClick={() => removeStatue(statue.id)}
                    className="absolute top-2 right-2 bg-red-900/80 text-white p-2 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-sm text-brand-bronze font-serif block">{statue.statueName}</span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-grey">{statue.material}</span>
                  <p className="text-[10px] text-brand-grey font-light line-clamp-2 mt-1">{statue.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
