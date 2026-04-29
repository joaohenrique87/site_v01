const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_DRIVE_FOLDER_ID;

export const fetchRelatoriosDoDrive = async () => {
  // Substitua sua linha da query por esta:
const query = `'${FOLDER_ID}' in parents and trashed = false`;
// E use o encodeURIComponent para garantir que a URL seja montada corretamente:
const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${fields}&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

   
    return data.files
      .filter(file => file.mimeType === 'application/pdf')
      .map(file => ({
        id: file.id,
        nome: file.name.replace('.pdf', ''),
        linkPreview: `https://drive.google.com/file/d/${file.id}/preview`,
        linkDownload: file.webContentLink,
        thumb: file.thumbnailLink
      }));
  } catch (error) {
    console.error("Erro na busca do Drive:", error);
    return [];
  }
};