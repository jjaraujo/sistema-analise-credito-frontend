import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import {Link} from 'react-router';
import Modal from 'react-awesome-modal'; 


class Score extends Component {

  constructor(){
      super();
      this.state = {exibeTabela:false, 
        mostraModalBens:false,
        mostraModalRendas:false,
        scores:[],
        scoreSelecionado : {}}; 
    }

    componentDidMount(){
      $.ajax({ 
        url:"http://localhost:8763/score/buscaTodosScores",
        dataType: 'json',
        success:function(response){    
          if(response != null && response.length > 0){   
          this.setState({isShowTable:true,scores:response});
        } 
        }.bind(this),
      });     
    }

    closeModalBens() {
      this.setState({mostraModalBens : false});
    }

    showModalBens(score){
        this.setState({scoreSelecionado:score,mostraModalBens:true});
    }

        
    closeModalRendas() {
      this.setState({ mostraModalRendas : false});
    }

    showModalRendas(score){
        this.setState({scoreSelecionado:score,mostraModalRendas:true});
    }


  render() {

    const TabelaBens = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Quitado</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.scoreSelecionado.bens.map(function(bem){
                return(
                  <tr>
                    <td>{bem.tipo}</td>
                    <td>{bem.valor}</td>
                    <td>{bem.quitado}</td>
                  </tr> 
                )},this)
            }
          </tbody>
        </table> 
      </div>           
    )

    const TabelaRendas = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>Formal</th>
              <th>Documento do empregador</th>
              <th>Salario</th>
              <th>Inicio</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.scoreSelecionado.rendas.map(function(renda){
                return(
                  <tr>
                    <td>{renda.formal}</td>
                    <td>{renda.documentoEmpregador}</td>
                    <td>{renda.salario}</td>
                    <td>{renda.inicio}</td>
                  </tr> 
                )},this)
            }
          </tbody>
        </table> 
      </div>           
    )

    const TabelaScore = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Idade</th>
              <th>Bens</th>
              <th>Renda</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.scores.map(function(score){
                return(
                  <tr>
                    <td>{score.cpf}</td>
                    <td>{score.idade}</td>
                    <td onClick={() => this.showModalBens(score)}><Link to="/scores" className="pure-menu-link">{score.bens.length} Bem(s)</Link></td>
                    <td onClick={() => this.showModalRendas(score)}><Link to="/scores" className="pure-menu-link">{score.rendas.length} Renda(s)</Link></td>
                    <td>{score.endereco.logradouro}</td>
                  </tr> 
                )},this)
            }
          </tbody>
        </table> 
      </div>           
    )
    const Mensagem = () => (
      <h2>Nenhum Score cadastrado na base de dados</h2>
    )

      return(
          <div id="main">
              <div className="header">
                <h1>Scores cadastrados</h1>
              </div>
              <div className="content" id="content">
                <div>
                 {this.state.isShowTable && <TabelaScore/>}
                 {!this.state.isShowTable && <Mensagem/>}
                </div>
                <div> 
                  <Modal visible={this.state.mostraModalBens} width="400" height="300" effect="fadeInUp" onClickAway={() => this.setState({mostraModalBens:false})}>
                      <div>
                         {this.state.mostraModalBens && <TabelaBens/>}
                      </div>
                  </Modal><Modal visible={this.state.mostraModalRendas} width="600" height="400" effect="fadeInUp" onClickAway={() => this.setState({mostraModalRendas:false})}>
                      <div>
                         {this.state.mostraModalRendas && <TabelaRendas/>}
                      </div>
                  </Modal>
                </div> 

              </div>
          </div>
          );
  }
}

export default Score;