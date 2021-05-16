import React from "react";

class MemeGenerator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            topText:'',
            bottomText:'',
            randomImg:'http://i.imgflip.com/1bij.jpg',
            allMemeImgs:[]
        }
    }

    inputHandler=(event)=>{
        const { name, value } = event.target;
        this.setState({ [name]:value});
    }

    submissionHandler=(event)=>{
        event.preventDefault();
        const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMemeImage = this.state.allMemeImgs[randomIndex].url;
        this.setState({ randomImg:randomMemeImage })
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => this.setState({ allMemeImgs: response.data.memes }))
    }

    render(){
        return (<>
        <form onSubmit={this.submissionHandler}>
            <input type="text" name="topText" value={this.state.topText} placeholder="Enter Message" onChange={this.inputHandler} />
            <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Enter Message" onChange={this.inputHandler} />
            <button>Generate</button>
        </form>
        <div className="meme">
            <img src={this.state.randomImg} alt="Image"/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
        </>)
    }
}

export default MemeGenerator;