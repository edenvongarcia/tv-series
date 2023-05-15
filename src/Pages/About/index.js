import Author from './author.json';
import Avatar from '../../assets/images/avatar.jpg';

export const About = () => {
     return (
        <section className="well2">
            <div className='container'> 
                {
                    Author.map( author => {
                        return(
                            <div className='row' key={author.id}>
                                <div className='col-md-4 col-sm-6'>
                                    <h2>About Me</h2>
                                    <img src={Avatar} className="img-fluid" alt={author.name} />
                                    <h5>{author.aboutTag}</h5>
                                    <p>{author.about}</p>
                                </div>

                                <div className='col-md-4 col-sm-6'>
                                    <h2>More Info</h2>

                                    <ul class="index-list">
                                        <li>
                                            <h5>Name</h5>
                                            <p>{author.name}</p>
                                        </li>
                                        <li>
                                            <h5>Age</h5>
                                            <p>{author.age}</p>
                                        </li>
                                        <li>
                                            <h5>Status</h5>
                                            <p>{author.status}</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <h2>Interests</h2>

                                    <ul className="marked-list2">
                                        {
                                            author.interests.map((data, index) => {
                                                return(
                                                    <li key={index}><span>{data}</span></li>
                                                )
                                            })                   
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
     )
}  
