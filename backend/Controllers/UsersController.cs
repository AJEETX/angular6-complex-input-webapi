using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

   [Route("Users")]
    public class UsersController : Controller
    {
        private IUserService _Userservice;

        public UsersController(IUserService Userservice)
        {
            _Userservice = Userservice;
        }

        [HttpGet("{q?}")]
        public IActionResult GetUsers(string q = "")
        {
            var Users = _Userservice.Get(q);
            return Ok(Users);

        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public IActionResult GetUser(int id)
        {
            var User = _Userservice.GetById(id);
            if (User == null) return NotFound();
            return Ok(User);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult PostUser([FromBody][Required]User User)
        {
            if (!ModelState.IsValid || User == null || string.IsNullOrEmpty(User.Name) || string.IsNullOrEmpty(User.Detail) )
            return BadRequest(ModelState);
            _Userservice.Add(User);
            return Ok(User);
        }

        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody]User User)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            User.ID = id;
            if (!_Userservice.Update(User)) return NotFound();
            return Ok(new {Status="User updated"});
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (!_Userservice.Delete(id)) return BadRequest();
            return Ok(new {Status= "User deleted"});
        }
    }