import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css'
})
export class DocumentationComponent {
activeTab: 'vehicle' | 'user' | 'contract' | 'other' = 'vehicle';

  documents = [
    {
      type: 'vehicle',
      name: 'SOAT 2025',
      fileUrl: '',
      status: 'valid',
      uploadedBy: 'Admin',
      uploadDate: '2025-01-10',
      expirationDate: '2026-01-10',
      notes: 'Renewed in January'
    },
    {
      type: 'user',
      name: 'Driver License - John Doe',
      fileUrl: '',
      status: 'expired',
      uploadedBy: 'Admin',
      uploadDate: '2023-05-15',
      expirationDate: '2025-05-15',
      notes: 'Needs renewal'
    },
    {
      type: 'contract',
      name: 'Rental Agreement #001',
      fileUrl: '',
      status: 'valid',
      uploadedBy: 'Admin',
      uploadDate: '2025-08-01',
      notes: 'Signed digitally'
    },
    {
      type: 'other',
      name: 'Internal Note - Vehicle Damage',
      fileUrl: '',
      status: 'pending',
      uploadedBy: 'Support',
      uploadDate: '2025-09-20',
      notes: 'Pending insurance review'
    }
  ];

  get filteredDocuments() {
    return this.documents.filter(doc => doc.type === this.activeTab);
  }
}

