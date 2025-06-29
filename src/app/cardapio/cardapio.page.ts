import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService } from '../services/coleta-backend.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: false,
})
export class CardapioPage implements OnInit {

  solicitacoes: any[] = [];

  constructor(
    private coleta: ColetaBackendService, 
    private http: HttpClient, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.carregarSolicitacoes();
  }


  carregarSolicitacoes(){

    this.coleta.listarSolicitacoes(1, 10)
    .subscribe(
      (res: any) => {
        this.solicitacoes = res.data.filter((s: any) => s.accepted !== true && s.progress === "waiting");
        console.log(this.solicitacoes);
      },
      (err: any) => {
        console.error('Erro ao carregar solicitações', err);
      }
    );
  }

  abrirDetalhes(item: any){
    console.log('Item clicado:', item);
    this.navCtrl.navigateForward(`/pedido-prestador/${item.id}`);
  }

  async cliqueFuncaoDesabilitada() {
    const alert = await this.alertController.create({
      header: 'Função Indisponível',
      message: 'Esta funcionalidade está desabilitada no momento. Novas implementações estão previstas para a próxima sprint.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
