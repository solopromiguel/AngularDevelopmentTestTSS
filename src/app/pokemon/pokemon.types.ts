export interface IPokemon
{
    name: number | null;
    url: string | null;
}
export interface IPokemonPagination
{
    offset: number | null;
    limit: number| null;
    count :number | null;
    next : string | null;
    previous : string | null;
}