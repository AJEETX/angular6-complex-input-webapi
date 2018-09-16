using Microsoft.EntityFrameworkCore;

public class DataContext:DbContext
{
public DataContext(DbContextOptions<DataContext> options):base(options)
{
    
}
public DbSet<User> User {get; set;}
public DbSet<Status> Statuses {get; set;}
}