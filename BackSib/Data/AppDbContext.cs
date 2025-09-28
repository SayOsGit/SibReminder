using BackSib.Models;
using Microsoft.EntityFrameworkCore;

namespace BackSib.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<Status> Statuses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Reminder>()
                .Property(r => r.DateCreate)
                .HasDefaultValueSql("NOW()"); 

               
            base.OnModelCreating(modelBuilder);
        }
    }
}
