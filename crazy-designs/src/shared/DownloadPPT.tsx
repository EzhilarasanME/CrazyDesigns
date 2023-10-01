
const DownloadPPT = ({ pptData }) => {
    
  const downloadFile = () => {
    const blob = new Blob([pptData], { type: 'application/vnd.ms-powerpoint' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentation.ppt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  downloadFile()
};

export default DownloadPPT;
