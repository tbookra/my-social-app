export const initialState = {
  auth: {
    // user: null,
    user: {
      _id: "6321c795e99d7fd9b03c272e",
      username: "test3",
      email: "test3@gmail.com",
      password: "$2b$10$BxeOmeZ80ii38cxamSCf/Ox86bAYgM05vt75tOf0tCJf25F3vhxZi",
      profilePicture: "",
      coverPicture: "",
      followers: [],
      followings: [],
      isAdmin: false,
      createdAt: {
        $date: {
          $numberLong: "1663158165141",
        },
      },
      updatedAt: {
        date: {
          numberLong: "1663158165141",
        },
      },
      __v: 0,
    },
    isFetching: false,
    error: false,
  },
  posts: {
    newPostId: null,
    postSending: false,
    postError: false,
  },
  updateProfileImgs: {
    img_uploads: false,
    uploadError: false,
    uploadSuccess: null,
  },
};
