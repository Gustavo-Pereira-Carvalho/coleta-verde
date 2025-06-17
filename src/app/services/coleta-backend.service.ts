import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export enum EColetaRole {
  user,
  employee,
  enterprise,
  admin,
}

export interface IColetaBackendResponse<T> {
  message?: string;
  data?: T;
  status: number;
}

export interface IColetaAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
}

export interface IColetaUser {
  id: number;
  email: string;
  verified: boolean;
  description: string;
  name: string;
  password: string;
  role: EColetaRole;
  addresses: IColetaAddress[];
  createdAt: number;
  rating: number;
  completedSolicitations?: number;
  cpf?: string;
  cnpj?: string;
}

export type TAuthAccountType = 'user' | 'employee' | 'enterprise';

export interface IAuthRegister {
  email: string;
  name: string;
  password: string;
  accountType: TAuthAccountType;
  cpf?: string;
  cnpj?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColetaBackendService {
  private readonly url = 'https://coletaverde.up.railway.app';
  private token: string = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') ?? '';
  }

  /**
   * Seta o token de autentição do usuário
   *
   * @param value O token de autenticação do usuário
   */
  public set setToken(value: string) {
    this.token = value;
    localStorage.setItem('token', value);
  }

  /**
   * @returns O token de autenticação do usuário armazenado
   */
  public get getToken(): string {
    return this.token;
  }

  private rawRequest(
    method: string,
    path: string,
    body?: any
  ): Observable<IColetaBackendResponse<any>> {
    let headers = new HttpHeaders();
    if (!this.token) this.token = localStorage.getItem('token') ?? '';
    headers = headers.set('Authorization', `Bearer ${this.token}`);

    return this.http.request(method, this.url + path, {
      headers,
      body,
    }) as Observable<IColetaBackendResponse<any>>;
  }

  /**
   * Faz o login do usuário
   * @param email O email do usuário
   * @param password A senha do usuário
   * @returns O token de autenticação do usuário ou erro
   */
  public getJwtByCredentials(
    email: string,
    password: string
  ): Observable<IColetaBackendResponse<string>> {
    return this.rawRequest('POST', '/auth/login', { email, password });
  }

  // public getLoginType(email: string, password: string, accountType: TAuthAccountType): Observable<IColetaBackendResponse

  /**
   * Busca os dados do usuário logado
   * @returns Os dados do usuário ou erro
   */
  public getCurrentUserData(): Observable<IColetaBackendResponse<IColetaUser>> {
    return this.rawRequest('GET', '/user/me');
  }

  public createAccount(data: IAuthRegister) {
    return this.rawRequest('POST', '/auth/register', data);
  }

  /**
   * Função para fazer solicitação de coleta
   * @param enderecoSelecionadoIndex Índice do endereço selecionado
   * @param descricao Descrição do lixo a ser coletado
   * @param valor Valor sugerido para a coleta
   * @returns Observable da resposta
   */
  public fazerSolicitacao(
    formData: FormData
  ): Observable<IColetaBackendResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      // NÃO defina Content-Type aqui! O Angular cuidará disso com boundary corretamente.
    });

    return this.http.post<IColetaBackendResponse<any>>(
      this.url + '/solicitation/create',
      formData,
      { headers }
    );
  }

  adicionarEndereco(endereco: IColetaAddress) {
    return this.rawRequest('POST', '/address/create', endereco);
  }
  listarEndereco() {
    return this.rawRequest('GET', '/address/all');
  }
  deletarEnderecoPorIndex(index: number) {
    return this.rawRequest('DELETE', `/address/delete/index/${index}`);
  }


  listarSolicitacoes(page: number, limit: number) {
    return this.rawRequest(
      'GET',
      `/solicitation/all?page=${page}&limit=${limit}`
    );
  }

  listarPedidosCliente(page: number) {
    return this.rawRequest('GET', `/solicitation/id/${page}`);
  }

  public aceitarSolicitacao(
    id: number
  ): Observable<IColetaBackendResponse<any>> {
    const body = { id };
    return this.rawRequest('POST', '/solicitation/accept', body);
  }

  public buscarSolicitacaoPorId(id: number) {
    return this.rawRequest('GET', `/solicitation/id/${id}`);
  }

  getUsuarioPorId(id: number) {
    return this.rawRequest('GET', `/user/id/${id}`);
  }

  public pagarSolicitacao(
    id: number
  ): Observable<IColetaBackendResponse<any>> {
    const body = { id };
    return this.rawRequest('POST', `/billing/approve/${id}`, body);
  }

  finalizarSolicitacao(id: number){
    return this.rawRequest('PUT', `/solicitation/finish/${id}`)
  }

  cancelarSolicitacao(id: number){
    return this.rawRequest('PUT', `/solicitation/cancel/${id}`);
  }

}


