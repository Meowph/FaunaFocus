using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fauna_Focus.Controllers
{
    public class userExperiencesController : Controller
    {
        // GET: userExperiencesController
        public ActionResult Index()
        {
            return View();
        }

        // GET: userExperiencesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: userExperiencesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: userExperiencesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: userExperiencesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: userExperiencesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: userExperiencesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: userExperiencesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
