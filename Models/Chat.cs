using Microsoft.Extensions.Hosting;
using Microsoft.VisualBasic;

namespace Fauna_Focus.Models
{ 
    public class Chat
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public string Text {  get; set; }
        public DateTime PublishDateTime { get; set; }
    }
}
