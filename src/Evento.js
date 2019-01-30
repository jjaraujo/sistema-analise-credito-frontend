import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';


class Evento extends Component {

  constructor(){
      super();
    this.state = {exibeTabela:false,eventos:[]}; 
    }

    componentDidMount(){
      $.ajax({
        url:"http://localhost:8762/evento/buscaTodosEventos",
        dataType: 'json',
        success:function(response){    
          if(response != null && response.length > 0){   
          this.setState({isShowTable:true,eventos:response});
        } 
        }.bind(this),
        
        error: function(response){
        console.log("erro");
        }
    } 
    ).fail(function(jqXHR, textStatus, msg){
        console.log("Errroooooo");
     });     
    }

  render() {      
    const TabelaEventos = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.eventos.map(function(evento){
                return(
                  <tr key={evento.id}>
                    <td>{evento.cpf}</td>
                    <td>{evento.data}</td>
                    <td>{evento.descricao}</td>
                    <td>{evento.valor}</td>
                    <td>{evento.endereco.logradouro}</td>
                  </tr> 
                )},this)
            }
          </tbody>
        </table> 
      </div>           
    )
    const Mensagem = () => (
      <h2>Nenhum evento na base de dados</h2>
    )

      return(
          <div id="main">
              <div className="header">
                <h1>Eventos cadastrados</h1>
              </div>
              <div className="content" id="content">
                <div>
                 {this.state.isShowTable && <TabelaEventos/>}
                 {!this.state.isShowTable && <Mensagem/>}
                </div>
              </div>
          </div>
          );
  }
}

export default Evento;