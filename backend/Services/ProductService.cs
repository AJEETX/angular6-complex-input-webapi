using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public interface IUserService 
{
    List<User> Get(string q);
    User GetById(int id);
    User Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
public class UserService : IUserService
{
    readonly DataContext _context;
    public UserService(DataContext context)
    {
        _context=context;
    }
    public User Add(User user)
    {
        _context.User.Add(user);
        _context.SaveChanges();
        return user;
    }

    public bool Delete(int id)
    {
        var User = _context.User.Find(id);
        if (User != null)
        {
            _context.User.Remove(User);
            return _context.SaveChanges()!=0?true:false;
        }
        return false;
    }

    public List<User> Get(string q)
    {
        var allUser = _context.User.Include(p=>p.Skills).AsQueryable();
        q = q.Trim().ToLowerInvariant();
        if (!string.IsNullOrEmpty(q))
        {
            allUser = allUser.Where(m => m.Name.ToLowerInvariant().Contains(q)
                || m.Detail.ToLowerInvariant().Contains(q)
                || m.Car.ToLowerInvariant().Contains(q)
                || m.Gender.ToLowerInvariant().Contains(q)
                // || m.Statuses.ToLowerInvariant().Contains(q)
                );
        }

        return allUser.ToList();
    }

    public User GetById(int id)
    {
        return _context.User.Find(id);
    }

    public bool Update(User User)
    {
        var update = _context.User.Update(User);
        _context.SaveChanges();
        return update is null ? false : true;
    }
}