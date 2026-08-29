import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'data', 'site-content.json');
const inquiriesFilePath = path.join(process.cwd(), 'data', 'inquiries.json');

export function getSiteContent() {
  try {
    if (!fs.existsSync(contentFilePath)) {
      return null;
    }
    const data = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site content:', error);
    return null;
  }
}

export function saveSiteContent(newContent: any) {
  try {
    const dir = path.dirname(contentFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(contentFilePath, JSON.stringify(newContent, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving site content:', error);
    return false;
  }
}

export function getInquiries() {
  try {
    if (!fs.existsSync(inquiriesFilePath)) {
      return [];
    }
    const data = fs.readFileSync(inquiriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return [];
  }
}

export function saveInquiry(inquiry: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  preferredMode?: string;
  preferredDate?: string;
  message: string;
}) {
  try {
    const inquiries = getInquiries();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiry,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    inquiries.unshift(newInquiry);

    const dir = path.dirname(inquiriesFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
    return newInquiry;
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return null;
  }
}

export function updateInquiryStatus(id: string, status: string) {
  try {
    const inquiries = getInquiries();
    const item = inquiries.find((i: any) => i.id === id);
    if (item) {
      item.status = status;
      fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return false;
  }
}

export function deleteInquiry(id: string) {
  try {
    const inquiries = getInquiries();
    const filtered = inquiries.filter((i: any) => i.id !== id);
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(filtered, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return false;
  }
}
