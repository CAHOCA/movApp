import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  public allContacts: any;
  public datosObtenidos: any;

  constructor(public contacts: Contacts, public platform: Platform) { 

  }

  ngOnInit() {
  }

  listarContactos() {


    this.contacts.find(['displayName', 'phoneNumbers', 'emails']).then(data => {
      this.allContacts = data;
      console.log(this.allContacts);
      console.log(JSON.stringify(this.allContacts));
      this.datosObtenidos = this.allContacts;
    });
  }

}
