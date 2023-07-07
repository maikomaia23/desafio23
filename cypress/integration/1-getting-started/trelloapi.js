//import faker from 'faker';
describe(' CADASTRO  E EXCLUSAO', () => {
    beforeEach(() => {
     
     
    })

    let idQuadro // variavel para novo  quadro
    let idLista //variavel para nova lista
    let idCartao //variavel para novo cartao

//alterado2
    it('CRIACAO  QUADRO', () => {
    var nameBoard = "novoQuadro"
    const baseUrl ='https://api.trello.com/1/boards/?name=';
    const KeytokenUrl = '&key=21d39f4c63d54d1f4434f50dabc3bbb0&token=ATTA4c38db7f70c4d54c5a6eced9c19fee41f1031f29e441ee9fbe855eff7667b10264DE58F7';
    
    cy.request({
        method: 'POST',
        url: baseUrl +nameBoard+ KeytokenUrl,

    }).then((response)=>{
       expect(response.status).to.be.equal(200)//resposta do login
       idQuadro = response.body.id


      })
   })

   
   it('LISTA NOVA PARA INSERIR NOVO CARD', () => {  //nova lista para inserir no novo card
    cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/lists?name=NovaLista&idBoard=${idQuadro}&key=21d39f4c63d54d1f4434f50dabc3bbb0&token=ATTA4c38db7f70c4d54c5a6eced9c19fee41f1031f29e441ee9fbe855eff7667b10264DE58F7`
      
        }).then((response)=>{
        expect(response.status).to.be.equal(200)//resposta do board
        cy.log(response.body);
        idLista = response.body.id //id da lista para novo card
        
    })
    
  })
  it('CRIAR CARD NA NOVA LISTA', () => { // inserir card na nova lista
    
      cy.request({
        method: 'POST',
        url:  `https://api.trello.com/1/cards?idList=${idLista}&key=21d39f4c63d54d1f4434f50dabc3bbb0&token=ATTA4c38db7f70c4d54c5a6eced9c19fee41f1031f29e441ee9fbe855eff7667b10264DE58F7`

  
    }).then((response)=>{
    expect(response.status).to.be.equal(200)//resposta do board
    cy.log(response.body);
    idCartao = response.body.id


  })
  })

  it('EXCLUIR CARTAO ', () => {

      cy.request({
      method: 'DELETE',
     url:`https://api.trello.com/1/cards/${idCartao}?key=21d39f4c63d54d1f4434f50dabc3bbb0&token=ATTA4c38db7f70c4d54c5a6eced9c19fee41f1031f29e441ee9fbe855eff7667b10264DE58F7`
  
    }).then((response)=>{
     expect(response.status).to.be.equal(200)//resposta do login 
   })
  })

  it('EXCLUIR QUADRO', () => {
    cy.request({
        method: 'DELETE',
        url:`https://api.trello.com/1/boards/${idQuadro}`,
        qs:{
          key:'21d39f4c63d54d1f4434f50dabc3bbb0',
          token:'ATTA4c38db7f70c4d54c5a6eced9c19fee41f1031f29e441ee9fbe855eff7667b10264DE58F7',
        },
      
      }).then((response)=>{
      expect(response.status).to.be.equal(200)//resposta do login 
      
      })
    
    
    })

})

