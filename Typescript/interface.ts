interface Human {
    firstName: string,
    lastName: string,

    greet: () => void;
}

const me: Human = {
    firstName: "Mahir",
    lastName: "Ratanpara",
    greet: () => {
        console.log("Hello Humans!!")
    }
}

class instructor implements Human {
    firstName: "Mahir";
    lastName: "Ratanpara";

    greet() {
        console.log("Helloooooos!!")
    }
}