import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';

class Index extends Component{
    static async getInitialProps(){
        let stories;
        try {
            const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
            stories = await response.json();
        } catch (error) {
            console.log(error);
            stories = [];
        }
        return { stories };
    }
    render(){
        const { stories } = this.props;
        if( stories.length === 0){
            return <Error statusCode={503} />
        }
        return(
            <div>
                <h1>Hackernews</h1>
                <div>
                    {stories.map(story => {
                        return <p key={story.id}>{story.title}</p>
                    })}
                </div>
            </div>
        );
    }

}

export default Index;