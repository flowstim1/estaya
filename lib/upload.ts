export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Uploading image:', file.name);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Upload response:', data);

    if (!response.ok) {
      throw new Error(data.error || `Upload failed with status ${response.status}`);
    }

    if (data.success) {
      return data.url;
    } else {
      throw new Error(data.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  console.log(`Uploading ${files.length} images...`);
  
  const uploadPromises = files.map(file => uploadImage(file));
  return Promise.all(uploadPromises);
}