import { PhotoCamera } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';



const ImageUpload = ({ handleUpload, label, name }: { handleUpload: any, label: string, name: string}) => {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1048576; // 1MB

    if (selectedFile && allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
      setFile(selectedFile);
      setError("");
      setPreviewURL(URL.createObjectURL(selectedFile));
    } else {
      setFile("");
      setError("Please select a valid image file (JPEG or PNG) that is no larger than 1MB.");
      setPreviewURL("");
    }
  };

  const handleUploadClick = () => {
    if (file) {
      handleUpload(file);
      setFile("");
      setPreviewURL("");
    } else {
      setError('Please select an image to upload.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewURL && <Avatar alt="Preview" src={previewURL} sx={{ width: 50, height: 50 }} />}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >

        
        <Button variant="outlined" size='small' component="label" title='Select Profile Image.' sx={{ padding: '0px', marginRight: '15px' }}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input type="file" hidden name={name} id="imageUpload" accept="image/jpeg,image/png" onChange={handleChange} />
            <PhotoCamera fontSize="small" />
          </IconButton>
        </Button>
        <Button variant="contained" component="label" onClick={handleUploadClick}>
          Upload Profile Picture
        </Button>
      </Box>
    </div>
  );
};

export default ImageUpload;