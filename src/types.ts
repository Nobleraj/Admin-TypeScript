export type UserState = {
    id: string;
    firstName: string | undefined;
    lastName: string | undefined;
    address: string | undefined;
    city: string | undefined;
    country: string | undefined;
  };
  export type UserStateAPI = {
    isLoading : boolean;
    userName : {
      userId : string;
      id : string;
      title : string;
      completed : boolean;
    }
  }
  