import React, { Component } from 'react';
import Card from './Card'

class Cards extends Component {
    constructor(props){
        super(props);
        this.state={
            cards: [
            ]
        };
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);      
        this.addCard=this.addCard.bind(this);  
        this.handleSave=this.handleSave.bind(this);      
    }
    addCard(content){
        let cards = this.state.cards;
        cards.push({id:cards.length+1, content: content});
        this.setState({cards});
    }
    handleDelete(cardId) {
        const cards = this.state.cards.filter(c=>c.id!==cardId);
        console.log(cards);
        console.log(cardId);
        this.setState({cards});
    }
    handleEdit(cardId) {
        console.log("handleEdit",cardId);
    }
    handleSave(cardId){
        // Extracting card's content is still under development
        //var topic = "";
        //var backend_api = "https://appbackend-hci.herokuapp.com/MapUpdate/";
        console.log("handleSave", cardId);
        var tmp = this;
        var content = this.state.cards[0].content;
        var api = "https://conceptmap-backend.herokuapp.com/MapUpdate/";
        var topic = "NLP_intro-";
        fetch(api.concat(topic,content))     //跟後端連結去getJson
        .then(function (res) {
            return res.json();
        }).then(function(myJson) {
            tmp.props.SetNewJson(myJson);
            //tmp.props.SetProgress(3,myJson);
            return myJson;
        });
        console.log("Handle saving is completed ...");
            
    }
    componentDidUpdate(prevProps,prevState) {
        // 常見用法（別忘了比較 prop）：
        if (this.props.newCardContent !== prevProps.newCardContent) {
              this.addCard(this.props.newCardContent);
        };
        if (this.state!== prevState) {
            console.log("this.state = ", this.state);
        }
      }
    render() { 
        return (
            <div>
                {this.state.cards.map(card =>
                    (<Card content={card.content}
                            key={card.id}
                            id = {card.id}
                            onDelete={this.handleDelete}
                            onEdit={this.handleEdit} 
                            onSave={this.handleSave}/>
                        ))}
            </div>
        );
    }
}
 
export default Cards;
