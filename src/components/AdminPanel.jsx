import React, { useState } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import { useInquiries } from '../hooks/useInquiries';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

export default function AdminPanel() {
  const { statues, addStatue, removeStatue, sliderImages, addSliderImage, removeSliderImage, mobileSliderImages, addMobileSliderImage, removeMobileSliderImage } = usePhotos();
  const { inquiries, removeInquiry } = useInquiries();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'gallery' | 'slider' | 'slider_mobile' | 'inquiries'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadToCloud = async (uploadFile) => {
    // Send the raw file directly to our server-side API
    // which will convert it to AVIF and upload it to R2
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: uploadFile
    });
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errorMsg = errData.details ? `${errData.error}: ${errData.details}` : errData.error;
      throw new Error(errorMsg || 'Failed to upload and convert image.');
    }
    
    const { publicUrl } = await res.json();
    return publicUrl;
  };

  const handleSave = async () => {
    if (preview && file) {
      setIsUploading(true);
      try {
        const publicUrl = await uploadToCloud(file);
        await addStatue({
          statueName: statueName,
          material: statueMaterial,
          description: statueDescription,
          image: publicUrl
        });
        setPreview(null);
        setFile(null);
        setStatueName('');
        setStatueMaterial('');
        setStatueDescription('');
        alert('Statue added successfully to the gallery!');
        setActiveTab('gallery');
      } catch (err) {
        alert('Upload failed: ' + err.message);
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please provide a photo to upload.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-brand-sand font-sans p-8 md:p-16">
      
      {/* Admin Header */}
      <div className="flex justify-between items-end border-b border-brand-bronze/20 pb-8 mb-12">
        <div>
          <h1 className="text-3xl font-serif font-light text-white tracking-wider">Dashboard</h1>
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
      <div className="flex space-x-8 mb-12 border-b border-brand-charcoal overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative whitespace-nowrap ${activeTab === 'upload' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Add New Statue
          {activeTab === 'upload' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative whitespace-nowrap ${activeTab === 'gallery' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Manage Gallery
          {activeTab === 'gallery' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
        <button 
          onClick={() => setActiveTab('slider')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative whitespace-nowrap ${activeTab === 'slider' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Hero Slider
          {activeTab === 'slider' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
        <button 
          onClick={() => setActiveTab('slider_mobile')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative whitespace-nowrap ${activeTab === 'slider_mobile' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Hero Slider (Mobile)
          {activeTab === 'slider_mobile' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
        </button>
        <button 
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 text-xs uppercase tracking-[0.15em] transition-colors relative whitespace-nowrap ${activeTab === 'inquiries' ? 'text-brand-bronze' : 'text-brand-grey hover:text-white'}`}
        >
          Customer Inquiries
          {activeTab === 'inquiries' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-bronze" />}
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
              disabled={!preview || isUploading}
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
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {statues.length === 0 ? (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-32 border border-brand-bronze/10 bg-[#1A1A17]">
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-bronze mb-4">Gallery is Empty</span>
              <p className="text-brand-grey font-light italic max-w-md leading-relaxed text-sm">
                No statues have been added to the custom gallery yet.
              </p>
            </div>
          ) : (
            statues.map((statue, idx) => (
              <div
                key={statue.id}
                className={`relative group overflow-hidden w-full break-inside-avoid border border-brand-bronze/10 bg-brand-sand/15 transition-all duration-500 hover:border-brand-bronze/35 hover:shadow-lg`}
              >
                {/* Delete Button - Absolute Top Right */}
                <button 
                  onClick={() => removeStatue(statue.id)}
                  className="absolute top-4 right-4 z-50 bg-red-900/80 text-white p-2 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-md"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Fine boundary borders */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none transition-all duration-500 group-hover:border-brand-bronze/15 z-20" />

                {/* Content Area */}
                <div className="relative overflow-hidden flex items-center justify-center">
                  <img
                    src={statue.image}
                    alt={statue.statueName || 'Gallery Statue'}
                    className="w-full h-auto block transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                  />

                  {/* Luxury Blur Overlay with Editorial Narrative */}
                  <div className="absolute inset-0 bg-brand-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-8 z-10 pointer-events-none">
                    <div className="space-y-3">
                      <h3 className="text-xl font-serif text-white font-light">
                        {statue.statueName}
                      </h3>
                      <div className="w-8 h-[1px] bg-brand-bronze" />
                      <p className="text-[11px] text-brand-sand/80 font-light leading-relaxed">
                        {statue.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-auto pt-4">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 border-b border-brand-bronze/30 pb-1">
                        {statue.material}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caption beneath images when not hovered */}
                <div className="p-5 border-t border-brand-bronze/10 flex justify-between items-center bg-brand-bg/50">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal">
                      {statue.statueName || 'Untitled Artwork'}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Slider Images Tab */}
      {activeTab === 'slider' && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Upload Desktop Slider Photo</label>
                <div className="border-2 border-dashed border-brand-bronze/20 hover:border-brand-bronze/50 transition-colors bg-[#1A1A17] p-12 flex flex-col items-center justify-center text-center cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-brand-bronze mb-4 opacity-50" />
                  <span className="text-sm text-white">Click or drag image to upload</span>
                  <span className="text-[10px] text-brand-grey mt-2">Recommended Dimensions: 1920x1080px (16:9 ratio)</span>
                </div>
              </div>
              
              <button 
                onClick={async () => {
                  if (preview && file) {
                    setIsUploading(true);
                    try {
                      const publicUrl = await uploadToCloud(file);
                      await addSliderImage(publicUrl);
                      setPreview(null);
                      setFile(null);
                      alert('Slider image added successfully!');
                    } catch (err) {
                      alert('Upload failed: ' + err.message);
                    } finally {
                      setIsUploading(false);
                    }
                  } else {
                    alert('Please provide a photo.');
                  }
                }}
                disabled={!preview || isUploading}
                className="w-full bg-brand-bronze text-white uppercase text-xs tracking-[0.2em] py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isUploading ? 'Uploading to Cloud...' : 'Add to Desktop Slider'}</span>
                {!isUploading && <Check className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-2">
               <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Photo Preview</label>
               <div className="bg-[#1A1A17] border border-brand-bronze/20 h-[300px] flex items-center justify-center p-4">
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

          <div className="space-y-4">
            <h3 className="text-xs text-brand-grey uppercase tracking-[0.15em]">Current Desktop Slider Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sliderImages.length === 0 ? (
                <div className="col-span-full py-20 text-center text-brand-grey italic font-light">
                  No images in desktop slider.
                </div>
              ) : (
                sliderImages.map(slide => (
                  <div key={slide.id} className="bg-[#1A1A17] border border-brand-bronze/10 p-4 space-y-4 group">
                    <div className="aspect-video bg-black/50 border border-brand-bronze/5 flex items-center justify-center relative overflow-hidden">
                      <img src={slide.image} alt="Slider" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={() => removeSliderImage(slide.id)}
                        className="absolute top-2 right-2 bg-red-900/80 text-white p-2 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slider Images Tab */}
      {activeTab === 'slider_mobile' && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Upload Mobile Slider Photo</label>
                <div className="border-2 border-dashed border-brand-bronze/20 hover:border-brand-bronze/50 transition-colors bg-[#1A1A17] p-12 flex flex-col items-center justify-center text-center cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-brand-bronze mb-4 opacity-50" />
                  <span className="text-sm text-white">Click or drag image to upload</span>
                  <span className="text-[10px] text-brand-grey mt-2">Recommended Dimensions: 1080x1920px (9:16 ratio)</span>
                </div>
              </div>
              
              <button 
                onClick={async () => {
                  if (preview && file) {
                    setIsUploading(true);
                    try {
                      const publicUrl = await uploadToCloud(file);
                      await addMobileSliderImage(publicUrl);
                      setPreview(null);
                      setFile(null);
                      alert('Mobile slider image added successfully!');
                    } catch (err) {
                      alert('Upload failed: ' + err.message);
                    } finally {
                      setIsUploading(false);
                    }
                  } else {
                    alert('Please provide a photo.');
                  }
                }}
                disabled={!preview || isUploading}
                className="w-full bg-brand-bronze text-white uppercase text-xs tracking-[0.2em] py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isUploading ? 'Uploading to Cloud...' : 'Add to Mobile Slider'}</span>
                {!isUploading && <Check className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-2">
               <label className="text-xs text-brand-grey uppercase tracking-[0.15em]">Photo Preview</label>
               <div className="bg-[#1A1A17] border border-brand-bronze/20 h-[300px] flex items-center justify-center p-4">
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

          <div className="space-y-4">
            <h3 className="text-xs text-brand-grey uppercase tracking-[0.15em]">Current Mobile Slider Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mobileSliderImages.length === 0 ? (
                <div className="col-span-full py-20 text-center text-brand-grey italic font-light">
                  No images in mobile slider.
                </div>
              ) : (
                mobileSliderImages.map(slide => (
                  <div key={slide.id} className="bg-[#1A1A17] border border-brand-bronze/10 p-4 space-y-4 group">
                    <div className="aspect-[9/16] bg-black/50 border border-brand-bronze/5 flex items-center justify-center relative overflow-hidden">
                      <img src={slide.image} alt="Mobile Slider" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={() => removeMobileSliderImage(slide.id)}
                        className="absolute top-2 right-2 bg-red-900/80 text-white p-2 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-light text-white mb-6">Customer Inquiries</h2>
          {inquiries.length === 0 ? (
            <p className="text-brand-grey font-light">No inquiries yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-[#1A1A17] border border-brand-bronze/20 p-6 flex flex-col space-y-4">
                  <div>
                    <h3 className="text-white text-lg font-serif font-light">{inq.full_name}</h3>
                    <p className="text-brand-bronze text-xs font-light">{new Date(inq.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-brand-grey text-xs"><span className="text-brand-sand">Email:</span> {inq.email}</p>
                    <p className="text-brand-grey text-xs"><span className="text-brand-sand">Phone:</span> {inq.phone}</p>
                  </div>
                  <div>
                    <p className="text-brand-sand text-xs font-light leading-relaxed">{inq.description}</p>
                  </div>
                  <div className="mt-auto pt-4 flex justify-end border-t border-brand-bronze/10">
                    <button 
                      onClick={() => removeInquiry(inq.id)}
                      className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest transition-colors flex items-center space-x-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
