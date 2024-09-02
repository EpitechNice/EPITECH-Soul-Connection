class Option
{
    constructor(value)
    {
        this.value = value;
        if (this.value === undefined)
            this.value = null;
    }

    get()
    {
        return this.value;
    }

    isSome()
    {
        return this.value !== null;
    }

    isNull()
    {
        return this.value === null;
    }

    unwrap(or)
    {
        if (this.value === null) {
            if (or !== undefined)
                return or;
            throw new Error("Tried to unwrap null value");
        }
        return this.value;
    }
}

const UserStatus = {
    CUSTOMER:   0x01000000,
    EMPLOYEE:   0x01000001,
    MANAGER:    0x01000002
}

class User
{
    constructor(parameters)
    {
        this.id = 0;
    }
}