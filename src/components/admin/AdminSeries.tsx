import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface Series {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  material: {
    name: string;
  };
}

export const AdminSeries = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSeries = async () => {
    try {
      const { data, error } = await supabase
        .from('series')
        .select(`
          *,
          material:material_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch series');
        console.error('Error:', error);
        return;
      }

      setSeries(data || []);
    } catch (error) {
      console.error('Error fetching series:', error);
      toast.error('Failed to fetch series');
    } finally {
      setLoading(false);
    }
  };

  const deleteSeries = async (seriesId: string) => {
    if (!confirm('Are you sure you want to delete this series? This will also delete all associated products.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('series')
        .delete()
        .eq('id', seriesId);

      if (error) {
        toast.error('Failed to delete series');
        console.error('Error:', error);
        return;
      }

      toast.success('Series deleted successfully');
      fetchSeries();
    } catch (error) {
      console.error('Error deleting series:', error);
      toast.error('Failed to delete series');
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Series Management</CardTitle>
              <CardDescription>
                Manage product series within material categories
              </CardDescription>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Series
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {series.length === 0 ? (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No series found</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first product series
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Series
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Series Name</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {series.map((serie) => (
                  <TableRow key={serie.id}>
                    <TableCell className="font-medium">
                      {serie.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {serie.material?.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {serie.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      {new Date(serie.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSeries(serie.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};