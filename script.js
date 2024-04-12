function zipFolder() {
    const folderInput = document.getElementById('folderInput');
    const statusText = document.getElementById('status');

    if (folderInput.files.length === 0) {
        statusText.textContent = 'กรุณาเลือกโฟลเดอร์ที่จะบีบอัด!';
        return;
    }

    const folderName = folderInput.files[0].webkitRelativePath.split('/')[0];
    const zip = new JSZip();

    for (const file of folderInput.files) {
        const pathParts = file.webkitRelativePath.split('/');
        const relativePath = pathParts.slice(1).join('/');

        if (file.type === '') {
                zip.folder(relativePath);
        } else {
            zip.file(relativePath, file);
        }
    }

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
        const zipFileName = `${folderName}.zip`;
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = zipFileName;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
        statusText.textContent = 'โฟลเดอร์ถูกบีบอัดเรียบร้อยเเล้ว! ';
    }).catch(function (error) {
        console.error('เกิดข้อผิดพลาดขึ้น :', error);
        statusText.textContent = 'เกิดข้อผิดพลาดระหว่างบีบอัด กรุณาลองอีกครั้งนะ.';
    });
}