import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import {Link} from 'react-router';
import Modal from 'react-awesome-modal'; 


class Pessoa extends Component {

  constructor(){
      super();
    this.state = {exibeTabela:false,eventos:[], mostraModal: false}; 
    }

    componentDidMount(){
      $.ajax({
        url:"http://localhost:8761/pessoa/buscaTodosDadosPessoas",
        dataType: 'json',
        success:function(response){    
          if(response != null && response.length > 0){   
          this.setState({isShowTable:true,pessoas:response,pessoaSelecionada:{},mostraModal:false});
        } 
        }.bind(this)
    } 
    );     
    }

    closeModal() {
      this.setState({ mostraModal : false});
    }

    showModal(pessoa){
        this.setState({pessoaSelecionada:pessoa,mostraModal:true});
    }

  render() {      

     const TabelaDividas = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Atrasada</th>
              <th>Cnpj Instituição</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.pessoaSelecionada.dividas.map(function(divida){
                return(
                  <tr>
                    <td>{divida.tipo}</td>
                    <td>{divida.valor}</td>
                    <td>{divida.atrasada}</td>
                    <td>{divida.cnpjInstituicao}</td>
                  </tr> 
                )},this)
            }
          </tbody>
        </table> 
      </div>  
      )

      const TabelaPessoas = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data Nascimento</th>
              <th>Dividas</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.pessoas.map(function(pessoa){
                return(
                  <tr>
                    <td>{pessoa.cpf}</td>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.dtNascimento}</td>
                    <td onClick={() => this.showModal(pessoa)}><Link to="/pessoas" className="pure-menu-link">{pessoa.dividas.length} divida(s) </Link></td>
                    <td>{pessoa.endereco.logradouro}</td>
                  </tr> 
                )},this)    
                }
          </tbody>
        </table> 
      </div>  
      )    
    
    const Mensagem = () => (
      <h2>Nenhuma pessoa cadastrada na base de dados</h2>
    )

      return(
          <div id="main">
              <div className="header">
                <h1>Pessoas cadastrados</h1>
              </div>
              <div className="content" id="content">
                <div>
                 {this.state.isShowTable && <TabelaPessoas/>}
                 {!this.state.isShowTable && <Mensagem/>}
                </div>
                <div>
                  <Modal visible={this.state.mostraModal} width="600" height="400" effect="fadeInUp" onClickAway={() => this.setState({mostraModal:false})}>
                      <div>
                         {this.state.mostraModal && <TabelaDividas/>}
                      </div>
                  </Modal>
                </div>
              </div>
          </div>
          );
  }
}

export default Pessoa;