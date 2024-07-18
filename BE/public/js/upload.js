async function uploadFile(file) {
  const url = HOST_UPLOAD;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'File upload failed');
    }

    const result = await response.json();

    return result.data.url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
}
