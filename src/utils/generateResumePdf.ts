import { jsPDF } from 'jspdf';

export function downloadResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 42;

  // Colors
  const primaryNavy = '#0B2545';
  const headerBlue = '#133E87';
  const textDark = '#1E293B';
  const textMuted = '#475569';
  const dividerColor = '#CBD5E1';

  // Helper to add section header
  const addSectionHeader = (title: string) => {
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryNavy);
    doc.text(title, margin, y);
    y += 4;
    doc.setDrawColor(dividerColor);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  // Helper to add bullet point
  const addBullet = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textDark);
    
    // Draw bullet symbol
    doc.text('•', margin + 6, y);
    
    const lines = doc.splitTextToSize(text, contentWidth - 18);
    doc.text(lines, margin + 18, y);
    y += lines.length * 11 + 2;
  };

  // --- HEADER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryNavy);
  doc.text('AJAYRAJ B', pageWidth / 2, y, { align: 'center' });
  y += 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(headerBlue);
  doc.text('Computer Science & Engineering Student | Aspiring Data Analyst', pageWidth / 2, y, { align: 'center' });
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted);
  doc.text('Chennai, Tamil Nadu, India  |  +91 6382932901  |  ajay67068@gmail.com  |  github.com/ajay3554  |  linkedin.com/in/ajayraj15', pageWidth / 2, y, { align: 'center' });
  y += 10;

  // --- PROFESSIONAL PROFILE ---
  addSectionHeader('PROFESSIONAL PROFILE');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark);
  const profileText = 'I am a Computer Science and Engineering student and aspiring Data Analyst based in Chennai. I have completed a Data Analyst Internship at Techswot IT Solutions, where I gained practical exposure to data analysis and reporting workflows. I work with Python, SQL, Power BI, and Excel to clean data, explore trends, create visualizations, and develop dashboards that support data-driven decision-making.';
  const profileLines = doc.splitTextToSize(profileText, contentWidth);
  doc.text(profileLines, margin, y);
  y += profileLines.length * 11 + 2;

  // --- EDUCATION ---
  addSectionHeader('EDUCATION');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(textDark);
  doc.text('B.E. Computer Science and Engineering', margin, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted);
  const eduRight = 'August 2023 – May 2027';
  doc.text(eduRight, pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark);
  doc.text('PERI Institute of Technology  |  CGPA: 7.76/10 (up to 5th Semester)', margin, y);
  y += 14;

  // --- TECHNICAL SKILLS ---
  addSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Programming:', val: 'Python' },
    { label: 'Data Analysis:', val: 'Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization' },
    { label: 'Business Intelligence:', val: 'Power BI, DAX, Power Query' },
    { label: 'Database:', val: 'SQL, PostgreSQL' },
    { label: 'Spreadsheet:', val: 'Microsoft Excel' },
    { label: 'Tools:', val: 'Git, GitHub, VS Code' },
  ];

  skills.forEach((skill) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryNavy);
    doc.text(skill.label, margin, y);

    const labelWidth = doc.getTextWidth(skill.label) + 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textDark);
    const valLines = doc.splitTextToSize(skill.val, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += valLines.length * 11 + 1;
  });

  // --- ACADEMIC PROJECTS ---
  addSectionHeader('ACADEMIC PROJECTS');

  // Project 1: E-Commerce
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryNavy);
  doc.text('E-COMMERCE SALES ANALYTICS DASHBOARD | Power BI', margin, y);
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted);
  doc.text('Technologies: Power BI, DAX, Power Query, Data Modeling, Excel/CSV', margin, y);
  y += 11;

  addBullet('Built an interactive sales analytics dashboard to monitor sales, profit, orders, quantity, cost, and profit margin across 2024–2025.');
  addBullet('Performed data transformation and modeling using Power Query, with separate customer, product, sales, and date tables connected through relationships.');
  addBullet('Created DAX measures and interactive visuals for category, region, and monthly performance, including slicers and drill-through product analysis.');

  y += 4;

  // Project 2: RaktaNova
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryNavy);
  doc.text('RAKTANOVA | Emergency Blood Donor Management System', margin, y);
  y += 11;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted);
  doc.text('Technologies: FastAPI, Python, PostgreSQL, SQLAlchemy, Pydantic, HTML, CSS, JavaScript, Vercel', margin, y);
  y += 11;

  addBullet('Developed a web-based system to manage hospital blood requests and connect them with eligible nearby donors.');
  addBullet('Structured application data for donors, hospitals, blood requests, and notifications using PostgreSQL and SQLAlchemy.');
  addBullet('Built donor and hospital dashboards with request-status and notification workflows, gaining practical exposure to data handling and reporting.');

  // --- INTERNSHIP EXPERIENCE ---
  addSectionHeader('INTERNSHIP EXPERIENCE');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryNavy);
  doc.text('Data Analyst Intern', margin, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted);
  doc.text('Internship Completed (September2026-October2026) | Chennai', pageWidth - margin, y, { align: 'right' });
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(headerBlue);
  doc.text('Techswot IT Solutions', margin, y);
  y += 11;

  addBullet('Gained practical exposure to data analysis and reporting workflows in a professional environment.');
  addBullet('Applied Python, SQL, Power BI, and Excel to strengthen data analysis and visualization skills.');
  addBullet('Developed practical knowledge of data cleaning, exploratory data analysis (EDA), and reporting.');

  // --- CERTIFICATIONS ---
  addSectionHeader('CERTIFICATIONS');
  const certs = [
    'Microsoft Power BI Course: Data Visualization & Business Intelligence',
    'Data Science Foundation',
    'Ship a Full Stack App with Cursor + Claude Integration',
    'Build & Deploy AI Apps with Google AI Studio: Multilingual AI Speech App Development',
    'AI Tools & Claude Workshop',
    'Claude AI in 90 Minutes Productivity Course: Build Your AI Work Assistant',
  ];

  certs.forEach((cert) => {
    addBullet(cert);
  });

  // --- LANGUAGES ---
  addSectionHeader('LANGUAGES');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark);
  doc.text('English  |  Tamil', margin, y);

  // Trigger download
  doc.save('Ajayraj_B_Resume.pdf');
}
