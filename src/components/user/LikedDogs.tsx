import React from "react";
import { Redirect, RouteComponentProps, Link } from "react-router-dom";
import Axios from "axios";

interface IProps {
  userId: number;
}
interface IState {
  dogs: Array<dog>;
}
interface dog {
  id: number;
  name: string;
  age: string;
  breed: string;
  image: string;
  sex: string;
  location: string;
  sheddingLevel: string;
  energyLevel: string;
  bio: string;
  shelter: string;
  adopted: boolean;
  shelterId: number;
}

export default class LikedDogs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dogs: [],
    };
    this.getDogs();
  }

  getAdoptedText = (adopted: boolean): string =>
  {
    return adopted ? "Adopted" : "Available";
  }

  unLikeDog = (dogID: number): void => {
    Axios.get("http://54.215.186.163:8080/Barker-api/users/" + this.props.userId + "/dogs/" + dogID + "/unlike").then((resp) => {
    this.setState({dogs: []});      
    this.getDogs();
        }).catch(err => {alert("There was an error unliking the dog")});
  }


    getDogs = (): void => {
          Axios.get("http://54.215.186.163:8080/Barker-api/users/" + this.props.userId).then((resp) => {
            //console.log(resp.data.dogs);
            resp.data.likedDogs.forEach( (value: dog) => {
                //console.log(value.bio);
                this.state.dogs.push(value);
            })
            this.setState({dogs: this.state.dogs});
          }).catch(err => {alert("There was an error getting the dogs")});
        
    }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.dogs.length < 1 ? (
          <p className="text-purple-600 text-3xl">
            No Liked Dogs Yet - Select "Swipe" to view and "Like" dogs!
          </p>
        ) : null}
        {this.state.dogs.map(({ id, name, image, age, sex, adopted, shelter, sheddingLevel, energyLevel, bio }) => (
          <div key={id}>
            <p>
              {id}, {name}, {age}, {sex}, {this.getAdoptedText(adopted)}
            </p>
            <p>Located at {shelter}</p>
            <p>Shedding Level: {sheddingLevel}</p>
            <p>Energy Level: {energyLevel}</p>
            <p>{bio}</p>
            <img className="object-center mx-auto"
              width="200"
              height="100"
              src={image}
              alt={"Picture Unavailable"}
            />
            <button
              className="text-2xl rounded-full py-2 px-2 bg-red-400"
              onClick={this.unLikeDog.bind(this,id)}
            >
              Unlike Dog
            </button>
            <p> ------------------------- </p>
          </div>
        ))}
      </div>
    );
  }
}
