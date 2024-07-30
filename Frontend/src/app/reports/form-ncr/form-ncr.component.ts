import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../toast.service';
import axios from 'axios';
import { error } from 'console';

@Component({
  selector: 'app-form-ncr',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './form-ncr.component.html',
  styleUrl: './form-ncr.component.css'
})
export class FormNCRComponent implements OnInit {
  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.accountid = sessionStorage.getItem('accountid');
    console.log('Retrieved accountid:', this.accountid);
    this.getAccountInfo();
  }

  accountid: string | null = null;
  regulationbased: string = '';
  subject: string = '';
  audit_no: string = '';
  ncr_no: string = '';
  issued_date: string = '';
  responsible_office: string = '';
  audit_type: string = '';
  audit_scope: string = '';
  to_uic: string = '';
  attention: string = '';
  require_condition: string = '';
  level_finding: string = '';
  problem_analis: string = '';
  answer_duedate: string = '';
  issue_ian: string = '';
  ian_no: string = '';
  encounter_conditon: string = '';
  audit_by: string = '';
  audit_date: string = '';
  acknowledge_by: string = '';
  acknowledge_date: string = '';
  status: string = '';
  temporarylink: string = '';

  account: any = {};

  async getAccountInfo() {
    try {
      const response = await axios.post('http://localhost:3000/showAccount', { 
        accountid: this.accountid 
      });
      if (response.data.status === 200 && response.data.account) {
        this.account = response.data.account;
      } else {
        console.error('Error fetching account information:', response.data.message);
      }
    } catch (error) {
      console.error('There was an error fetching account info!', error);
    }
  }

  async addNCRInit() {
    try {
      const response = await axios.post('http://localhost:3000/addNCRInit', { 
        accountid: this.accountid, 
        regulationbased: this.regulationbased,
        subject: this.subject,
        audit_no: this.audit_no,
        ncr_no: this.ncr_no,
        issued_date: this.issued_date,
        responsible_office: this.responsible_office,
        audit_type: this.audit_type,
        audit_scope: this.audit_scope,
        to_uic: this.to_uic,
        attention: this.attention,
        require_condition: this.require_condition,
        level_finding: this.level_finding,
        problem_analis: this.problem_analis,
        answer_duedate: this.answer_duedate,
        issue_ian: this.issue_ian,
        ian_no: this.ian_no,
        encounter_conditon: this.encounter_conditon,
        audit_by: this.audit_by,
        audit_date: this.audit_date,
        acknowledge_by: this.acknowledge_by,
        acknowledge_date: this.acknowledge_date,
        status: this.status,
        temporarylink: this.temporarylink
      });

      if (response.data.status === 200) {
        this.toastService.successToast('NCR form submitted successfully');
        console.log('NCR Init added successfully');
      } else {
        this.toastService.failedToast('Error adding NCR Init');
        console.error('Error adding NCR Init:', response.data.message);
      }
    } catch (error) {
      this.toastService.failedToast('There was an error creating NCR form');
      console.error('There was an error creating NCR form', error);
    }
  }
}
