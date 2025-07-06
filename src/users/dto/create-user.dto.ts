import {MinLength, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Email inválido!'})
    email: string;

    @MinLength(6, {message: 'Senha muito curta, minimo 6 caracteres!'})
    password: string;

    @IsNotEmpty({message: 'Nome não pode ser vazio!'})
    name: string;
}
