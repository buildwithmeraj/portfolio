export function extractGoogleDriveFileId(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);

    const byPath = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    if (byPath?.[1]) {
      return byPath[1];
    }

    const byIdParam = parsed.searchParams.get("id");
    if (byIdParam) {
      return byIdParam;
    }

    const byDocPath = parsed.pathname.match(/\/document\/d\/([^/]+)/);
    if (byDocPath?.[1]) {
      return byDocPath[1];
    }
  } catch {
    return "";
  }

  return "";
}

export function buildGoogleDriveLinks(url) {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    return {
      viewUrl: url,
      downloadUrl: url,
      fileId: "",
    };
  }

  return {
    viewUrl: `https://drive.google.com/file/d/${fileId}/view`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
    fileId,
  };
}
