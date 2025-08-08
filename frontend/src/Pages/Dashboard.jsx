import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, FileText, Clock } from "lucide-react";

export default function Dashboard() {
  const history = JSON.parse(localStorage.getItem("mail_history") || "[]");
  const templates = JSON.parse(localStorage.getItem("mail_templates") || "[]");

  const [stats, setStats] = useState({
    generated: history.length,
    templates: templates.length || 3,
    thisWeek: 0,
  });

  useEffect(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const thisWeek = history.filter(
      (h) => new Date(h.timestamp) > weekAgo
    ).length;
    setStats((s) => ({ ...s, thisWeek }));
  }, [history]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Overview of your email generation activity in Eventus."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-1">
          Your AI email assistant is ready.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emails generated
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.generated}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templates}</div>
            <p className="text-xs text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">Emails generated</p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap gap-3">
        <Button asChild variant="hero">
          <Link to="/mail">Open Mail Generator</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/templates">Manage Templates</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/history">View History</Link>
        </Button>
      </section>
    </div>
  );
}
