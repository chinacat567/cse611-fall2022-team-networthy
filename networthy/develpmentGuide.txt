Guidelines :-

1. Do not edit any Spring Security classes and configurations. 
2. For new class, use correct name that defined the functionality of the class and correct package.
3. Do not use Lombok for now. Create constructors and getter-setters for each POJOS.
4. Add TO-DO[your_name] and text on incomplete functions.
5. Add Logger (logback slf4j) to each controller and use levels "Error" for errors/catched exceptions and "Info" for success.
6. For complex REST request create independent Request POJOS and Response if required. Example :- ChangePasswordRequest, JwtResponse etc.
7. For complex functions separate them from the controller and write the logic in the service class in service package.
