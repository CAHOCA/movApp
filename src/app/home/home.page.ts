import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TrustedStyleString } from '@angular/core/src/sanitization/bypass';
import { GuardarLocalService } from '../providers/guardar-local.service';
import { NgForm } from '@angular/forms';
// Componentes externos que realizan peticiones
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  x: number;
  y: number;
  z: number;
  lastX: number;
  lastY: number;
  lastZ: number;
  mov = 0;
  acelera: string;
  subscription;
  dedoOK: boolean;
  nombre: string;

  constructor(private deviceMotion: DeviceMotion,
              private faio: FingerprintAIO,
              private guardar: GuardarLocalService,
              private _translate: TranslateService,
              public route: Router) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.CargarStorage();
   }

  abrirContactos() {
 this.route.navigateByUrl('/contactos');
   }

   Dedo() {
     this.faio.show({
       clientId: 'Fingerprint-Demo',
       clientSecret: 'password', //Only necessary for Android
       disableBackup: true,  //Only for Android(optional)
       localizedFallbackTitle: 'Use Pin', //Only for iOS
       localizedReason: 'Please authenticate' //Only for iOS
     })
       .then((result: any) => this.dedoOK = true)
       .catch((error: any) => this.dedoOK = false);
   }

  start() {

    try {
      const opcion: DeviceMotionAccelerometerOptions = {
        frequency: 500
      };

      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
        (error: any) => console.log(error)
      );

      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration(opcion).subscribe((acceleration: DeviceMotionAccelerationData) => {
        if (!this.lastX) {
          this.lastX = acceleration.x;
          this.lastY = acceleration.y;
          this.lastZ = acceleration.z;
          return;
        }
        this.x = Math.abs(acceleration.x - this.lastX);
        this.y = Math.abs(acceleration.y -  this.lastY);
        this.z = Math.abs(acceleration.z - this.lastZ);
        this.acelera = '' + this.x + this.y + this.z ;
        if (this.x + this.y + this.z > 13) {
          this.mov = 1;
        } else {
          this.mov = 0 ; // no le entiendo aún
        }
      });
    } catch (err) {
      alert('Error en: ' + err);
    }
  }

  stop() {
    this.subscription.unsubscribe();
  }

   async CargarStorage() {
  this.nombre = await this.guardar.cargarData();
  }

  guardarStorage(form: NgForm) {
    if (form.valid) {
    this.guardar.guardarData(this.nombre);
  }
  }
}