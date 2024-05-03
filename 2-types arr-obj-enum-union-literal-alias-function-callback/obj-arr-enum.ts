const add = (num1: number, num2: number, showResult: boolean, phrase: string) => 
{
    if(showResult) console.log(phrase + (num1 + num2))
    else return num1 + num2;

}
    
    const number1 = 6, number2 = 12;
    const printResult = true;
    const resultPhrase = "result is: "
    const result = add(number1, number2, printResult, resultPhrase);
    
    // const person: {name: string, age: number} = {
    //   name: "Abdallah",
    //   age: 26
    // };
    
    // // better syntax 
    // const person = {
    //   name: "Abdallah",
    //   age: 26,
    //   hobbies: ["Sports", "Cocking"]
    // };
    
    // console.log(person.name)
    
    // let favorites: string[] = ["hello", "from", "the", "other", "side"]
    // // if you wanted a mixed array >>>> typs is any(works fine, but you lose TS benefits) >>>> let favorites: any[] = ["hello", 2, true]
    
    // for(const hobby of person.hobbies)
    // {
    //   console.log(hobby.toUpperCase())
    // }
    
    // const ADMIN = 0;
    // const READ_ONLY = 1;
    // const AUTHOR = 2;
    
    enum Role {ADMIN, READ_ONLY, AUTHOR} // enum will assign these labels to numbers starting from 0 
    // you can assign value to the first label to start the counting from, or you can assign values to any label, or even strings
    // enum Role {ADMIN = "ADMIN", READ_ONLY = 100, AUTHOR = "AUTHOR"} 
    const person = {
      name: "Abdallah",
      age: 26,
      hobbies: ["Sports", "Cocking"],
      role: Role.ADMIN
    };
    
    if(person.role === Role.ADMIN) 
    {
      console.log("isAdmin")
    }
    
    