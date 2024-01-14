# RestApi
Repozytorium zostało stworzone na potrzeby przedmiotu "Nowoczesne metody przetwarzania danych".
<br/>
<br/>
Autor: Wincenty Korobacz 25631 Informatyka NST 4 rok, gr. 3

## Uruchomienie projektu
Aby uruchomić projekt należy:
1. Uruchomić kontener docker z redisem i jego GUI za pomocą `docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`
2. Sklonować repozytorium (`git clone`).
3. Pobrać dependencje projektu za pomocą komendy `npm install`. Komendę należy uruchomić w głównym folderze repozytorium.
4. W terminalu uruchomić komendę `npm start` w głównym folderze repozytorium.
5. W przeglądarce internetowej przejść pod adres `localhost:8080`. Powinny wyświetlić się nazwa i wersja projektu. Oznacza to, że aplikacja jest gotowa do pracy.


## Opis projektu
Zgodnie z wytycznymi w pdfie `Redis 1.1 zadania` dostępnym na e-lea, utworzony został mechanizm do wprowadzania danych o uczelniach, a także do głosowania na te uczelnie.
<br/>
<br/>
Aplikacja została napisana w języku JavaScript, z wykorzystaniem paczki express i biblioteki redis, a także redis-om. Do testowania endpointów najlepiej użyć aplikacji Postman. Kolekcja Postman jest dostępna pod adresem: https://api.postman.com/collections/17393864-7c80c85f-dfc8-4ad4-be04-a280a6101eb7?access_key=PMAT-01HM4HRZDJAEMHX4YYSYHKDG09
<br/>
<br/>
W celu spełnienia wymagań projektu, utworzone zostało 6 endpointów:
1. `GET /universities` - zwraca listę wszystkich dodanych uczelni, posortowanych malejąco po wyniku głosowania na uczelnie.
2. `POST /university` - dodaje uczelnię do listy uczelni. Aby dodać uczelnię należy w body requestu podać dane:
```json
{
    "name": "UAM",
    "type": "uczelnia",
    "miasto": "Poznań"
}
```
Po dodaniu uczelni, automatycznie ustawiany jest jej wynik we właściwości `score` na 0.
3. `GET /university/:id` - zwraca informacje o uczelni o podanym id.<br/>
np: `GET /university/1` zwróci informacje o uczelni o id `1` (jeśli taka istnieje):
```json
{
    "name": "CDV",
    "type": "uczelnia",
    "miasto": "Poznań",
    "score": 45
}
```
4. `PUT /university/:id` - aktualizuje informacje uczelni o danym `id`.
Można modyfikować jedynie wartości `type` oraz `miasto`.
W tym celu należy zawrzeć te wartości w body requestu:
```json
{
    "type": "politechnika",
    "miasto": "Gdańsk"
}
```
5. `DELETE /university/:id` - usuwa uczelnię o danym `id`. Jeśli operacja się powiodła, otrzymamy odpowiedź `OK`.
6. `POST /university/vote` - głosuje na uczelnię o podanym `name`. W tym celu należy podać nazwę uczelni w body requestu:
```json
{
    "name": "CDV"
}
```
Głosowanie na uczelnie zwiększa jej wynik we właściwości `score` o 1. Nie można zagłosować na uczelnię, która nie istnieje.
