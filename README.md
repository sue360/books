

ReadMe - GA Project Two: API - 2 days

Description

I created this web app as my second project for General Assembly’s software engineering immersive course. The project brief was to build a simple website integrating learning on the course so far, including JavaScript/REACT, Bootstrap, and more, with a focus on APIs; to consume data from an API and create an interactive app with it.

This was a shared project, and I collaborated with another student to build an app that displayed selections of books using a library API for information. Building this app allowed me to consolidate my learning on APIs, and to combine this with my passion for reading and stories. It was fun to work with another programmer too, who shared my interest in science fiction. I will discuss the process, results, and key takeaways below.

Deployment link: https://alexandriaprojectonline.netlify.app/ 

To access the final web app and code, please follow the link above. You will need to login to GitHub to access the full project.

Technologies Used

JavaScript/REACT
Bootstrap
CSS
APIs

Brief

The project brief set out necessary features the final app needed to include, to serve as a minimum viable product (MVP).

I’ve included snippets from the brief below:
 
## Overview

The second project is to **build a React application** that consumes a **public API**.


Your app must:

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components**
* **The app can have a router** - with several "pages", this is up to you and if it makes sense for your project.
* **Include wireframes** - that you designed before building the app.
* **Be deployed online** and accessible to the public (hosted on your public github, not GA github!)


Planning

We had only two days to complete this, so planning was crucial. To make collaborating easier, we made use of a google doc. We noted plans for an MVP, and beyond this, our ideas for a more complex product. We had hoped to use LiveCode to work together, but this proved difficult to set up. As a result, and due to the short time frame, we decided to work together using screen sharing, which allowed us to concentrate on the same challenges at the same time and bounce ideas off each other.

We started by searching for a suitable API to work with. This was important to pin down as it would help us understand how long we might need to budget for initial stages of extracting data from the API. It would also set the scope of what sort of design might be possible, and what functionality we could include to make our app engaging for users. A multitude of APIs were available to explore, and many might have been suitable, however, the limited time frame meant that we had to look for an API that would work and make a decision quickly. Initially, I wanted to work with a ‘boredom’ API, for the variety of data it included. It looked like it might make for a fun and useful app, where users could find inspiration for activities to try. Working on a meaningful project seemed important as it would help with motivation, through what was sure to be a challenging project. Unfortunately, this API had a number of limitations, the main one being that it appeared to only generate one random activity at a time. This was too simplistic, we agreed, so continued our search.
	The library API was a suitable option as it offered plenty of inspiration and - since we shared an appreciation for science fiction - a sense of purpose and utility. The API’s scope was vast - we found at least four associated APIs that could prove useful, for more detail on books, on authors, covers and high level information on books. It was possible to search for books by category, and this offered scope to make the app into a sort of portal for users to find new books by entering keywords. After brainstorming ideas, and testing out how the API worked using Insomnia, which allowed us to pseudo code how we would go about extracting different aspects of data from the APIs, we decided to go with the approach detailed below. We then drafted wireframes of the three page layouts the app would include (also below).
  
  ![proj_two_google_doc](https://user-images.githubusercontent.com/113911812/212377812-f38d9094-56d6-4d36-817a-5cc2abcf29f9.png)
![proj_two_image2_wireframe](https://user-images.githubusercontent.com/113911812/212377815-6355717c-4b2e-4cf3-8dfe-bf057c032e2d.png)
![proj_two_wireframe1](https://user-images.githubusercontent.com/113911812/212377816-2e014ec8-92e4-4fa8-ac91-412ab0c2fa68.png)
![proj_two_wireframe3](https://user-images.githubusercontent.com/113911812/212377817-6b18d1dc-8172-4b26-b8ab-e2b8a88fcfd1.png)

Build

Once the structure for our programme was set up (with components for each page and for a navigation bar to remain on each page on the site) the first step was getting the data from the main book API. After various tests using Insomnia, we checked this in VS code.

Console.log proved useful for testing the type and scope of the data, to confirm that all the properties we wanted to display were accessible. As below, we used useEffect and an async function to request data from the API.

 useEffect(() => {
   const getBooks = async () => {
     generateRandomSelection()
     try {
       const { data } = await axios.get(`https://openlibrary.org/subjects/${subject}.json?limit=200`)
       const { works } = data
       setWorks(works)
       console.log(data.works.length)
     } catch (err) {
       console.log(err)
       setErrors(true)
     }
   }
   getBooks()
 }, [subject])

As our MVP design was fairly simple, it was straightforward from there to display the data from the API in sections on the index page, which set out an overview of books. As below, we used Bootstrap to quickly set up a structure for the page, and as we had already drawn and pseudocode this, it did not take long to achieve this.

  <Col key={keyId}md="6" lg="4" mb="4" className='book-card mb-4'>
                 <Link subject={subject} to={{ pathname: `/books/${subject}/${keyId}`, state: { works: true } }}>
                   <Card className='mb-1'>
                     <div className="card-image" style={{ backgroundImage: `url(https://covers.openlibrary.org/b/id/${cover_id}-M.jpg)` }}></div>
                                          <Card.Body>
                       <Card.Title className='mb-0'>{title}</Card.Title>
                       <p>{authorName}</p>
                       {/* {console.log(authorName)} */}
                       <p><em>{first_publish_year}</em></p>
                     </Card.Body>
                   </Card>
                 </Link>
               </Col>
               
               
    Another key stage was using information from one API to extract information about the same book from another API. The code snippet below demonstrates how we achieved this - we saved the book ID (extracted through a previous API request) and entered it into a new async function. It was important to keep code dynamic due to the volume of data we were working with. We were also able to use the bookID number in the page URL for individual books.

 // ! Execution
 useEffect(() => {
   const getBook = async () => {
     try {
       const { data } = await axios.get(`https://openlibrary.org/works/${bookId}.json`)
       setBook(data)
       getDescription(data)
       getSubjects(data)
       console.log('BookSingle props:', subject)
     } catch (err) {
       console.log(err)
       setErrors(err.message)
     }
   }
   getBook()
 }, [bookId, subject])
 
 const getDescription = (book) => {
   const description = book.description
   if (typeof book.description === 'object') {
     setDescription(book.description.value)
    
   } else {
     setDescription(book.description)
   }

  
 }
 


While we kept the underlying layout minimalist and uncomplicated, so as not to distract from the information and the actual content users would be loading, we built on it by choosing a theme. A pivotal moment in the site design was our decision to go with a classical theme inspired by the library of Alexandria (as in the screenshot below which shows the landing page). This added a narrative to the site and allowed for a more consistent theme across the pages. 

![alexandria_screenshot](https://user-images.githubusercontent.com/113911812/212378410-6646e42c-b377-44a9-a396-6035c56a8a83.png)

Challenges
 

Creating functionality for users to save a collection of books - with more time, we might have been successful in building this feature. Currently, users are unable to save the results of a search once they click through to a single book. This is unfortunate, but with limited time, we were unable to work out how to save each collection of books to local storage.
Fixing bugs! - unexpected bugs slowed us down throughout - we were both still new to using REACT, so had to refer to notes and take time to work out what had caused bugs during the build.

Visual design - we prioritised building a functional app over design, which meant that there was room for improvement in terms of the app’s final visual appearance. 
Displaying the author's name - while having information distributed across a number of APIs proved useful in the sense that there was more information to work with, it made it difficult to gather information about one book and the author on the same page. As a result, and due to time pressure, we were unable to display the author’s name on the individual book pages. There was also more information about authors we did not have time to utilise.

Wins

Improved my understanding of REACT, Bootstrap and APIs, and built my most complex web app to date.
Working out how to load more data entries from the API - initially it seemed that we could only display 12 items from the book API. This would have imposed limitations on our app, so we worked to understand this limitation, and were able to work around it by changing the url on the API link to manipulate the number of books to be included in the data return.
Fixing a bug that meant entering a search prompt with a space e.g. science fiction rather than science-fiction produced an error. We used conditional logic to fix this and it was satisfying to see it work.


Key Learnings/Takeaways

Improved understanding of how to work with APIs, and how to quickly test out ideas (e.g. using Insomnia to examine data and strategize how to extract it, and also ‘hacking’ to extract data and see how it might be displayed).
Gained more experience in project management, and in working with a collaborator.

Bugs

The app does not save a user's selection of books after a first search.
The app does not display authors’ names on the individual book pages.


Future Improvements

I could improve the visual design of the app to make it cleaner and more modern, while maintaining the classical/academic aesthetic e.g. through the font and the library of Alexandria images.
I could use local storage to allow users to save and retrieve favourite books.
Could make more use of the author info API e.g. to display other books by the same author.


                     
