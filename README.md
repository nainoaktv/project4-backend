
# Ayyo - a social media app!

Ayyo is an app that enables users to create and share content or to participate in social networking.

### Features

- Create an account
- Start the conversation by making a post
- Continuing a conversation by making comments beneath posts
- Ability to create, edit and delete posts


## Technologies used

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&style=for-the-badge)
![nodedotjs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&style=for-the-badge)



## Proudly made by:
[![@nainoaktv](https://img.shields.io/badge/Frontend-Nainoaktv-yellowgreen)](https://github.com/nainoaktv) 
[![@xAlice2](https://img.shields.io/badge/Backend-xAlice2-blueviolet)](https://github.com/xAlice2)

## Installation

Install Ayyo with the following command

```bash
  npm install
```
    
## Future Enhancements

- Profile picture file upload

- Ability to edit account details

## Screenshots

![App Screenshot](https://raw.github.com/nainoaktv/project4-backend/main/ERD.png)

## API Reference

#### Pertaining to Users:

```http
  /users/
```
| Property | Parameter | Description                |
| :-------- |:-------- | :------------------------- |
| `POST` | `register` | To register for an account |
| `GET` | `${id}` | To get users history of posts |
| `GET` | `${id}/friends` | To get user's friends |
| `PATCH` | `${userId}/:friendId` | To add a friend  |

```http
  /auth/
```
| Property | Parameter | Description                |
| :-------- |:-------- | :------------------------- |
| `POST`      | `login` | to log in to an account |

#### Posting messages
```http
  /posts/
```
| Property | Parameter | Description                |
| :-------- |:-------- | :------------------------- |
| `GET` | `/` | To user feed (logged in only)  |
| `GET` | `/${userId}/posts` | To get all posts made by user |
| `POST` | `/${userId}/create` | To create posts |
| `PATCH` | `${postId}/edit` | To edit a post  |
| `PATCH` | `${postId}/like` | To like a post  |
| `DELETE` | `${postId}/delete` | To delete a post |


#### Commenting
```http
  /comments/
```
| Property | Parameter | Description                |
| :-------- |:-------- | :------------------------- |
| `POST` | `/${postId}/create` | To reply to a post  |
| `PATCH` | `/${commentId}/edit` | To edit a comment |
| `PATCH` | `${commentId}/like` | To like a comment  |
| `DELETE` | `${commentId}/delete` | To delete a comment  |

## Models

| Users | Posts  | Comments |
| :-------- | :-------- | :-------- |
| `Name` | `author_id` | `author_id` |
| `display_name` | `title` | `post_id` |
| `profile_pic` | `content` | `content` |
| `email` | `location` | `likes` |
| `password` | `content_picture_path` |  |
| `friends` | `user_profilepic` | |
|  | `likes` | |
|  | `comments` | |


## Lessons Learned

As with any project, none are without its own lessons.

### Step one: forget how social media works
Creating models was easy, anticipating chain reactions did not occur to me - so when I deleted the post
I realised that the comments related to that post was *abandoned.* You'd think I've figured out how to 
use social media by now.


### Step two: create a recursive loop

TL;DR - it was a doozy couple hours of this:

*MongoDB:* Warning: something something circular dependency don't do that.

*Google:* ??????????????????

*Stackoverflow:* ???????????????

*Me:* ???????????????????

As you know, MongoDB is a non-relational database. As such, relational activity is coded into controllers .. until I learned about MongoDB middleware:


Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. It is specified on the schema level.
This allowed me to create hooks in the Post & Comment schema. The post hook would delete comments relating to the postId before deleting posts and the comment hook 
adds comments to the post schema's comment array. And of course, one does not forget to import the schema it pertains to.

```js
PostSchema.pre('remove', async function (next) {
  const post = this

  await Comment.deleteMany({ post_id: post._id });
})
```
```js
CommentSchema.pre("save", async function (next) {
  const comment = this;

  await Post.findByIdAndUpdate(comment.post_id, {
    $push: { comments: comment._id },
  });
});

CommentSchema.pre("remove", async function (next) {
  const comment = this;

  await Post.findByIdAndUpdate(comment.post_id, {
    $pull: { comments: comment._id },
  });
});
```

By adding both and importing both in both schemas, I inadvertently created a circular dependency. The solution was
coding one and using only one of two middlewares. I chose to keep the comment schema middleware and to add a couple
lines in Post controller instead.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
