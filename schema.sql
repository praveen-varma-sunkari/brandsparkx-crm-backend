-- brandsparkx CRM Database
-- Run: mysql -u root -p crm_db < schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  clientName    VARCHAR(150) NOT NULL,
  contactInfo   VARCHAR(150) NOT NULL,
  serviceInterest VARCHAR(100),
  budget        VARCHAR(50),
  location      VARCHAR(150),
  leadSource    VARCHAR(50),
  status        ENUM('New','In Progress','Closed') DEFAULT 'New',
  priority      ENUM('Hot','Warm','Cold') DEFAULT 'Warm',
  owner         VARCHAR(100) DEFAULT 'Unassigned',
  notes         TEXT,
  dateCaptured  DATE DEFAULT (CURRENT_DATE),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO leads (clientName, contactInfo, serviceInterest, budget, location, leadSource, status, priority, owner) VALUES
('Ravi Kumar',   'ravi@example.com',   'Digital Marketing', 'Medium', 'Hyderabad', 'Website',  'New',         'Hot',  'Unassigned'),
('Anjali Reddy', 'anjali@example.com', 'Campaign Delivery', 'High',   'Khammam',   'WhatsApp', 'In Progress', 'Warm', 'Praveen'),
('Suresh Babu',  'suresh@example.com', 'HR Outsourcing',    'Low',    'Vijayawada','LinkedIn', 'Closed',      'Cold', 'Mike T.');
