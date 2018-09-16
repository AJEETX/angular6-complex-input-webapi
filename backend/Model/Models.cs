using System.Collections.Generic;

public class User
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Detail { get; set; }
    public string Car { get; set; }
    public string Gender { get; set; }
    public List<Status> Skills { get; set; }
}
public class Status
{
    public int ID {get;set;}
    public string Name { get; set; }
    public bool Selected {get;set;}
}