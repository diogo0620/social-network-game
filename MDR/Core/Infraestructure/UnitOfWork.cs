using System.Threading.Tasks;
using MDR.Domain.Shared;

namespace MDR.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MDRDbContext _context;

        public UnitOfWork(MDRDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}