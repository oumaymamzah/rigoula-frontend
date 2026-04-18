const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const resolveMediaUrl = (value) => {
  if (!value) return '';

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  ) {
    return value;
  }

  if (value.startsWith('/api/')) {
    return `${API_BASE_URL}${value}`;
  }

  if (value.startsWith('api/')) {
    return `${API_BASE_URL}/${value}`;
  }

  const uploadsIndex = value.indexOf('/uploads/');
  if (uploadsIndex !== -1) {
    return `${API_BASE_URL}${value.slice(uploadsIndex)}`;
  }

  if (value.startsWith('uploads/')) {
    return `${API_BASE_URL}/${value}`;
  }

  return value;
};

export default resolveMediaUrl;
