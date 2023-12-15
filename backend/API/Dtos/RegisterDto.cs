using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Nombre es Requerido")]
        public string DisplayName { get; set; }
      
        [EmailAddress(ErrorMessage ="Formato de Email No Válido")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Contraseña es Requerido")]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage ="La Clave debe Contener 1 Mayúscula, 1 Minúscula, 1 Número, 1 Caracter especial y entre 6 y 10 Caracteres")]
        public string Password { get; set; }
    }
}
